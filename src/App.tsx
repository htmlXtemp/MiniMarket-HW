import { useState } from 'react';
import styled from 'styled-components';
import { ThemePage } from './pages/ThemePage';
import { UiKitPage } from './pages/UiKitPage';

type TabId = 'theme' | 'kit' | 'catalog';

const tabs: { id: TabId; label: string }[] = [
  { id: 'theme', label: 'Тема' },
  { id: 'kit', label: 'UI-кит' },
  { id: 'catalog', label: 'Каталог' },
];

const Page = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space(6)};
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.muted};
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(5)};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.bg)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  font: inherit;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: ${({ theme }) => theme.space(5)};
`;

const Placeholder = styled.div`
  padding: ${({ theme }) => theme.space(6)};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.muted};
`;

export function App() {
  const [tab, setTab] = useState<TabId>('theme');

  return (
    <Page>
      <Header>
        <Title>Мини-маркет</Title>
        <Subtitle>UI-кит с темами на styled-components</Subtitle>
      </Header>
      <Tabs>
        {tabs.map((item) => (
          <Tab
            key={item.id}
            type="button"
            $active={item.id === tab}
            onClick={() => setTab(item.id)}>
            {item.label}
          </Tab>
        ))}
      </Tabs>
      <Content>
        {tab === 'theme' && <ThemePage />}
        {tab === 'kit' && <UiKitPage />}
        {tab === 'catalog' && <Placeholder>Раздел появится на следующем этапе.</Placeholder>}
      </Content>
    </Page>
  );
}