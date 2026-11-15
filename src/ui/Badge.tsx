import styled, { css } from 'styled-components';

export type BadgeVariant = 'neutral' | 'primary' | 'danger';

const tones = {
  neutral: css`
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.muted};
  `,
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.onDanger};
  `,
} satisfies Record<BadgeVariant, unknown>;

export const Badge = styled.div<{ $variant?: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.space(1)} ${theme.space(2)}`};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;

  ${({ $variant = 'neutral' }) => tones[$variant]}
`;