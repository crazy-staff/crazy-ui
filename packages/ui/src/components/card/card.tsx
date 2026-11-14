import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { cardStyles } from './card.styles';

const styles = cardStyles();

type DivProps = React.ComponentPropsWithRef<'div'>;

export interface CardRootProps extends DivProps, VariantProps<typeof cardStyles> {}

export interface CardProps extends Omit<CardRootProps, 'title'> {
  /** Heading of the card. With a title or description, children go into `Card.Body`. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Actions at the bottom (buttons, links). */
  footer?: React.ReactNode;
  classNames?: { header?: string; title?: string; description?: string; body?: string; footer?: string };
}

function CardRoot({ className, interactive, ...props }: CardRootProps) {
  return <div className={cn(cardStyles({ interactive }).root(), className)} {...props} />;
}

function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn(styles.header(), className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentPropsWithRef<'h3'>) {
  return <h3 className={cn(styles.title(), className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentPropsWithRef<'p'>) {
  return <p className={cn(styles.description(), className)} {...props} />;
}

function CardBody({ className, ...props }: DivProps) {
  return <div className={cn(styles.body(), className)} {...props} />;
}

function CardFooter({ className, ...props }: DivProps) {
  return <div className={cn(styles.footer(), className)} {...props} />;
}

/**
 * Short form: `<Card title="Infinite mana" description="…" footer={<Button>Enable</Button>}>…</Card>`.
 * Without `title`, `description` or `footer` it is just the surface and children render as they are.
 */
function CardSimple({ title, description, footer, classNames, children, ...props }: CardProps) {
  if (title == null && description == null && footer == null) {
    return <CardRoot {...props}>{children}</CardRoot>;
  }
  const hasHeader = title != null || description != null;
  return (
    <CardRoot {...props}>
      {hasHeader && (
        <CardHeader className={classNames?.header}>
          {title != null && <CardTitle className={classNames?.title}>{title}</CardTitle>}
          {description != null && <CardDescription className={classNames?.description}>{description}</CardDescription>}
        </CardHeader>
      )}
      {children != null && <CardBody className={classNames?.body}>{children}</CardBody>}
      {footer != null && (
        <CardFooter className={cn(children == null && hasHeader && 'pt-5', classNames?.footer)}>{footer}</CardFooter>
      )}
    </CardRoot>
  );
}

/**
 * A surface that groups content.
 *   <Card title="Infinite mana" footer={…}>…</Card>
 * or compound: <Card.Root><Card.Header>…</Card.Header><Card.Body>…</Card.Body></Card.Root>
 */
export const Card = Object.assign(CardSimple, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
