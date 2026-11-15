import styled from 'styled-components';

export const Grid = styled.div<{ $min?: string; $gap?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ $min = '180px' }) => $min}, 1fr));
  gap: ${({ theme, $gap = 4 }) => theme.space($gap)};
`;