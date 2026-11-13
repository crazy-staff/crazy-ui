import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { cardStyles } from './card.styles';

const styles = cardStyles();

type DivProps = React.ComponentPropsWithRef<'div'>;

export interface CardProps extends DivProps, VariantProps<typeof cardStyles> {}

function CardRoot({ className, interactive, ...props }: CardProps) {
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
 * Compound card:
 *   <Card.Root><Card.Header>…</Card.Header><Card.Body>…</Card.Body></Card.Root>
 */
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
