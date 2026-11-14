import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { avatarStyles } from './avatar.styles';

type Size = VariantProps<typeof avatarStyles>['size'];
const SizeContext = React.createContext<Size>('md');

export interface AvatarRootProps extends React.ComponentPropsWithRef<typeof BaseAvatar.Root> {
  size?: Size;
}

function AvatarRoot({ className, size = 'md', ...props }: AvatarRootProps) {
  return (
    <SizeContext.Provider value={size}>
      <BaseAvatar.Root className={cn(avatarStyles({ size }).root(), className)} {...props} />
    </SizeContext.Provider>
  );
}

function AvatarImage({ className, ...props }: React.ComponentPropsWithRef<typeof BaseAvatar.Image>) {
  return <BaseAvatar.Image className={cn(avatarStyles().image(), className)} {...props} />;
}

function AvatarFallback({ className, ...props }: React.ComponentPropsWithRef<typeof BaseAvatar.Fallback>) {
  const size = React.useContext(SizeContext);
  return <BaseAvatar.Fallback className={cn(avatarStyles({ size }).fallback(), className)} {...props} />;
}

/** "Dawid Seipold" → "DS". */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export interface AvatarProps extends Omit<AvatarRootProps, 'children'> {
  src?: string;
  /** Used for the alt text and the initials fallback. */
  name: string;
  classNames?: { image?: string; fallback?: string };
}

/** One-line form: `<Avatar src={url} name="Dawid Seipold" />`. Falls back to initials. */
function AvatarSimple({ src, name, classNames, ...props }: AvatarProps) {
  return (
    <AvatarRoot {...props}>
      {src && <AvatarImage src={src} alt={name} className={classNames?.image} />}
      <AvatarFallback className={classNames?.fallback} aria-label={src ? undefined : name}>
        {initials(name)}
      </AvatarFallback>
    </AvatarRoot>
  );
}

export const Avatar = Object.assign(AvatarSimple, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
