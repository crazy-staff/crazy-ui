import { Progress as BaseProgress } from '@base-ui/react/progress';
import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { progressStyles } from './progress.styles';

type Size = VariantProps<typeof progressStyles>['size'];

function ProgressRoot({ className, ...props }: React.ComponentPropsWithRef<typeof BaseProgress.Root>) {
  return <BaseProgress.Root className={cn(progressStyles().root(), className)} {...props} />;
}
function ProgressLabel({ className, ...props }: React.ComponentPropsWithRef<typeof BaseProgress.Label>) {
  return <BaseProgress.Label className={cn(progressStyles().label(), className)} {...props} />;
}
function ProgressValue({ className, ...props }: React.ComponentPropsWithRef<typeof BaseProgress.Value>) {
  return <BaseProgress.Value className={cn(progressStyles().value(), className)} {...props} />;
}
export interface ProgressTrackProps extends React.ComponentPropsWithRef<typeof BaseProgress.Track> {
  size?: Size;
  classNames?: { indicator?: string };
}
/** The bar; includes its indicator. */
function ProgressTrack({ className, classNames, size, ...props }: ProgressTrackProps) {
  const s = progressStyles({ size });
  return (
    <BaseProgress.Track className={cn(s.track(), className)} {...props}>
      <BaseProgress.Indicator className={cn(s.indicator(), classNames?.indicator)} />
    </BaseProgress.Track>
  );
}

export interface ProgressProps extends Omit<React.ComponentPropsWithRef<typeof BaseProgress.Root>, 'children'> {
  label?: React.ReactNode;
  /** Show the percentage next to the label. @default true when there is a label */
  showValue?: boolean;
  size?: Size;
  classNames?: { header?: string; label?: string; value?: string; track?: string; indicator?: string };
}

/** One-line form: `<Progress value={42} label="Downloading" />`. `value={null}` is indeterminate. */
function ProgressSimple({ label, showValue, size, classNames, ...props }: ProgressProps) {
  const s = progressStyles({ size });
  const withValue = showValue ?? Boolean(label);
  return (
    <ProgressRoot {...props}>
      {(label || withValue) && (
        <div className={cn(s.header(), classNames?.header)}>
          {label && <ProgressLabel className={classNames?.label}>{label}</ProgressLabel>}
          {withValue && <ProgressValue className={classNames?.value} />}
        </div>
      )}
      <ProgressTrack size={size} className={classNames?.track} classNames={{ indicator: classNames?.indicator }} />
    </ProgressRoot>
  );
}

export const Progress = Object.assign(ProgressSimple, {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Value: ProgressValue,
  Track: ProgressTrack,
});
