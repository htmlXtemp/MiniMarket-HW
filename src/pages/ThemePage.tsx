import styled from 'styled-components';
import { useThemeMode } from '../theme/ThemeRoot';
import type { ColorToken } from '../theme/theme';

const tokens: ColorToken[] = ['bg', 'surface', 'text', 'muted', 'border', 'primary', 'onPrimary'];

const Card = styled.div`
  padding: ${({ theme }) => theme.space(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const Text = styled.div`
  margin-top: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(5)};
`;

const Toggle = styled.button`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(4)}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font: inherit;
  cursor: pointer;
`;

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(5)};
`;

const Swatch = styled.div<{ $token: ColorToken }>`
  height: 56px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $token }) => theme.colors[$token]};
`;

const SwatchName = styled.div`
  margin-top: ${({ theme }) => theme.space(1)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

export function ThemePage() {
  const { mode, toggle } = useThemeMode();

  return (
    <Card>
      <Title>Тема</Title>
      <Text>
        Сейчас включена тема: <Current>{mode === 'dark' ? 'тёмная' : 'светлая'}</Current>.
        Все цвета лежат в типизированной теме и меняются одним ThemeProvider.
      </Text>
      <Text>
        Выбор сохраняется в localStorage, а при первом запуске берётся из prefers-color-scheme.
        В компонентах нет ни одного жёстко заданного цвета.
      </Text>
      <Row>
        <Toggle type="button" onClick={toggle}>
          Включить {mode === 'dark' ? 'светлую' : 'тёмную'} тему
        </Toggle>
      </Row>
      <Swatches>
        {tokens.map((token) => (
          <div key={token}>
            <Swatch $token={token} />
            <SwatchName>{token}</SwatchName>
          </div>
        ))}
      </Swatches>
    </Card>
  );
}