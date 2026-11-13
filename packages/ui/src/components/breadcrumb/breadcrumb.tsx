import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { breadcrumbStyles } from './breadcrumb.styles';

const s = breadcrumbStyles();

function BreadcrumbRoot({ className, ...props }: React.ComponentPropsWithRef<'nav'>) {
  return <nav aria-label="Breadcrumb" className={cn(s.root(), className)} {...props} />;
}
function BreadcrumbList({ className, ...props }: React.ComponentPropsWithRef<'ol'>) {
  return <ol className={cn(s.list(), className)} {...props} />;
}
function BreadcrumbItem({ className, ...props }: React.ComponentPropsWithRef<'li'>) {
  return <li className={cn(s.item(), className)} {...props} />;
}

export type BreadcrumbLinkProps = useRender.ComponentProps<'a'>;

/** A link in the trail. Pass `render={<Link to="…" />}` to use a router link. */
function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: mergeProps<'a'>({ className: cn(s.link(), className) }, props),
  });
}

function BreadcrumbPage({ className, ...props }: React.ComponentPropsWithRef<'span'>) {
  return <span aria-current="page" className={cn(s.page(), className)} {...props} />;
}

function BreadcrumbSeparator({ className, children, ...props }: React.ComponentPropsWithRef<'li'>) {
  return (
    <li role="presentation" aria-hidden className={cn(s.separator(), className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends React.ComponentPropsWithRef<'nav'> {
  /** The last item is the current page. */
  items: BreadcrumbItemData[];
  /** Turns an item into a router link: `(item) => <Link to={item.href} />`. */
  renderLink?: (item: BreadcrumbItemData) => React.ReactElement;
}

/** One-line form: `<Breadcrumb items={[{ label: 'Docs', href: '/docs' }, { label: 'Button' }]} />`. */
function BreadcrumbSimple({ items, renderLink, ...props }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot {...props}>
      <BreadcrumbList>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {last || !item.href ? (
                  last ? <BreadcrumbPage>{item.label}</BreadcrumbPage> : <span>{item.label}</span>
                ) : (
                  <BreadcrumbLink href={item.href} render={renderLink?.(item)}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}

export const Breadcrumb = Object.assign(BreadcrumbSimple, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
});
