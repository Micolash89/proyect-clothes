import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Card Component
 * Container with border and padding
 */
export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-card shadow-sm ${className}`}
      {...props}
    />
  );
}

/**
 * Card.Header - Top section of card
 */
export function CardHeader({ className = '', ...props }: CardSectionProps) {
  return (
    <div className={`border-b border-border px-6 py-4 ${className}`} {...props} />
  );
}

/**
 * Card.Body - Main content area
 */
export function CardBody({ className = '', ...props }: CardSectionProps) {
  return <div className={`px-6 py-4 ${className}`} {...props} />;
}

/**
 * Card.Footer - Bottom section
 */
export function CardFooter({ className = '', ...props }: CardSectionProps) {
  return (
    <div className={`border-t border-border px-6 py-4 ${className}`} {...props} />
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
