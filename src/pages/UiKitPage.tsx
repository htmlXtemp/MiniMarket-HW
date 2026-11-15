import styled from 'styled-components';
import { Badge, type BadgeVariant } from '../ui/Badge';
import { Button, type ButtonSize, type ButtonVariant } from '../ui/Button';
import { Card } from '../ui/Card';
import { Grid } from '../ui/Grid';
import { Input } from '../ui/Input';

const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'danger'];
const buttonSizes: ButtonSize[] = ['sm', 'md', 'lg'];

const demoItems: { name: string; note: string; badge: string; tone: BadgeVariant }[] = [
  { name: 'Наушники', note: 'Беспроводные, 30 часов', badge: 'Хит', tone: 'primary' },
  { name: 'Клавиатура', note: 'Механическая, тихая', badge: 'Новинка', tone: 'neutral' },
  { name: 'Лампа', note: 'Настольная, тёплый свет', badge: 'Скидка', tone: 'danger' },
];

const Wrap = styled.div`
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

const Section = styled.div`
  margin-top: ${({ theme }) => theme.space(6)};
  padding-top: ${({ theme }) => theme.space(5)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(4)};
`;

const Groups = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(5)};
  margin-top: ${({ theme }) => theme.space(4)};
`;

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  width: 240px;
`;

const DemoGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.space(4)};
`;

const CardTitle = styled.div`
  margin-top: ${({ theme }) => theme.space(3)};
  font-size: 17px;
  font-weight: 600;
`;

const CardText = styled.div`
  margin-top: ${({ theme }) => theme.space(1)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
`;

const CardAction = styled.div`
  margin-top: ${({ theme }) => theme.space(4)};
`;

export function UiKitPage() {
  return (
    <Wrap>
      <Title>UI-кит</Title>
      <Text>
        Button, Badge, Input, Card и Grid.
      </Text>
      <Section>
        <SectionTitle>Button</SectionTitle>
        <Text>4 варианта и 3 размера. Состояние loading показывает спиннер из keyframes.</Text>
        <Groups>
          {buttonVariants.map((variant) => (
            <Group key={variant}>
              <Label>{variant}</Label>
              {buttonSizes.map((size) => (
                <Button key={size} $variant={variant} $size={size}>
                  {size}
                </Button>
              ))}
            </Group>
          ))}
        </Groups>
        <Row>
          <Button $loading>
            Загрузка
          </Button>
          <Button $variant="secondary" disabled>
            Недоступно
          </Button>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Badge</SectionTitle>
        <Row>
          <Badge>Обычный</Badge>
          <Badge $variant="primary">Хит</Badge>
          <Badge $variant="danger">Скидка</Badge>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Input</SectionTitle>
        <Row>
          <Field>
            <Label>Название</Label>
            <Input defaultValue="Беспроводные наушники" />
          </Field>
          <Field>
            <Label>Недоступное поле</Label>
            <Input defaultValue="Недоступно" disabled />
          </Field>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Card и Grid</SectionTitle>
        <Text>Grid раскладывает карточки по колонкам через auto-fill.</Text>
        <DemoGrid $min="200px">
          {demoItems.map((item) => (
            <Card key={item.name}>
              <Badge $variant={item.tone}>{item.badge}</Badge>
              <CardTitle>{item.name}</CardTitle>
              <CardText>{item.note}</CardText>
              <CardAction>
                <Button $size="sm">В корзину</Button>
              </CardAction>
            </Card>
          ))}
        </DemoGrid>
      </Section>
    </Wrap>
  );
}
