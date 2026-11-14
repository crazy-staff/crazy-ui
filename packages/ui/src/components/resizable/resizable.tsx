import { GripHorizontal, GripVertical } from 'lucide-react';
import * as React from 'react';
import { Group, Panel, Separator, type GroupProps, type PanelProps, type SeparatorProps } from 'react-resizable-panels';
import { cn } from '../../lib/tv';
import { resizableStyles } from './resizable.styles';

type Orientation = 'horizontal' | 'vertical';
const OrientationContext = React.createContext<Orientation>('horizontal');

export interface ResizableGroupProps extends Omit<GroupProps, 'orientation'> {
  /** `horizontal` puts panels side by side, `vertical` stacks them. @default 'horizontal' */
  orientation?: Orientation;
}

/** Holds the panels and the handles between them. Panels and handles must be its direct children. */
function ResizableGroup({ orientation = 'horizontal', className, ...props }: ResizableGroupProps) {
  return (
    <OrientationContext.Provider value={orientation}>
      <Group orientation={orientation} className={cn(resizableStyles({ orientation }).group(), className)} {...props} />
    </OrientationContext.Provider>
  );
}

export type ResizablePanelProps = PanelProps;

/** One resizable area. Sizes: numbers are pixels, strings without a unit are percentages. */
function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel className={cn(resizableStyles().panel(), className)} {...props} />;
}

export interface ResizableHandleProps extends SeparatorProps {
  /** Show a small grip on the line. */
  withHandle?: boolean;
  classNames?: { grip?: string };
}

/** The draggable line between two panels; also focusable and moved with the arrow keys. */
function ResizableHandle({ withHandle, className, classNames, ...props }: ResizableHandleProps) {
  const orientation = React.useContext(OrientationContext);
  const s = resizableStyles({ orientation });
  const Grip = orientation === 'horizontal' ? GripVertical : GripHorizontal;
  return (
    <Separator className={cn(s.handle(), className)} {...props}>
      {withHandle && (
        <span aria-hidden className={cn(s.grip(), classNames?.grip)}>
          <Grip />
        </span>
      )}
    </Separator>
  );
}

/**
 * Panels split by draggable handles.
 *   <Resizable.Group>
 *     <Resizable.Panel defaultSize="30">…</Resizable.Panel>
 *     <Resizable.Handle withHandle />
 *     <Resizable.Panel>…</Resizable.Panel>
 *   </Resizable.Group>
 */
export const Resizable = {
  Group: ResizableGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
};
