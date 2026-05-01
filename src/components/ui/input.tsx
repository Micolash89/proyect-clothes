import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

/**
 * Input Component
 * Base input with error state and helper text
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={`w-full rounded-md border px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? 'border-destructive bg-destructive/5 text-destructive focus:border-destructive focus:ring-destructive/20'
              : 'border-input bg-background focus:border-primary'
          } ${className}`}
          {...props}
        />
        {helperText && (
          <p className={`text-xs ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
