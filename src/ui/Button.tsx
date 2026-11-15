import type { ButtonHTMLAttributes } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $loading?: boolean;
}

const variants = {
  primary: css`
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  `,
  secondary: css`
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  `,
  outline: css`
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  `,
  danger: css`
    border-color: ${({ theme }) => theme.colors.danger};
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
  `,
} satisfies Record<ButtonVariant, unknown>;

const sizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.space(1)} ${theme.space(3)}`};
    font-size: 13px;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space(2)} ${theme.space(4)}`};
    font-size: 15px;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.space(3)} ${theme.space(5)}`};
    font-size: 16px;
  `,
} satisfies Record<ButtonSize, unknown>;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Root = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  border: 1px solid;
  border-radius: ${({ theme }) => theme.radius};
  font: inherit;
  line-height: 1;
  cursor: pointer;

  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  flex: none;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
`;

export function Button({
  $variant = 'primary',
  $size = 'md',
  $loading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Root
      type="button"
      {...rest}
      $variant={$variant}
      $size={$size}
      $loading={$loading}
      disabled={disabled || $loading}
      aria-busy={$loading}>
      {$loading && <Spinner aria-hidden="true" />}
      {children}
    </Root>
  );
}