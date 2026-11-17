import styled from 'styled-components';
import { useState } from 'react';
import { useThemeMode } from '../theme/ThemeRoot';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Grid } from '../ui/Grid';
import { Input } from '../ui/Input';
import { formatPrice, type ProductCategory } from '../shared/products';
import { testProducts } from '../shared/testProducts';

type Filter = ProductCategory | 'Все' | 'Новинки';

const filters: Filter[] = ['Все', 'Новинки', 'Компьютеры', 'Дом', 'Аудио'];

const Wrap = styled.div`
  padding: ${({ theme }) => theme.space(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.surface};
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
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

const CartBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`;

const Section = styled.div`
  margin-top: ${({ theme }) => theme.space(5)};
  padding-top: ${({ theme }) => theme.space(4)};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(3)};
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: ${({ theme }) => theme.space(4)};
  margin-top: ${({ theme }) => theme.space(5)};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  width: 360px;
`;

const FilterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
`;

const TestGrid = styled(Grid)`
  grid-template-columns: 1fr;
  margin-top: ${({ theme }) => theme.space(5)};

  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1040px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
`;

const ProductTitle = styled.div`
  margin-top: ${({ theme }) => theme.space(3)};
  font-size: 16px;
  font-weight: 600;
`;

const Price = styled.div`
  margin-top: ${({ theme }) => theme.space(2)};
  font-size: 18px;
  font-weight: 600;
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(4)};
`;

const Empty = styled.div`
  margin-top: ${({ theme }) => theme.space(5)};
  padding: ${({ theme }) => theme.space(6)};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

const EmptyTitle = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
  font-weight: 600;
`;

const EmptyText = styled.div`
  margin-top: ${({ theme }) => theme.space(2)};
`;

const EmptyAction = styled.div`
  margin-top: ${({ theme }) => theme.space(4)};
`;

export function TestPage() {
  const { mode, toggle } = useThemeMode();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('Все');
  const [addingId, setAddingId] = useState<number | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = testProducts.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);
    const matchesFilter = filter === 'Все' || (filter === 'Новинки' ? product.isNew === true : product.category === filter);
    return matchesQuery && matchesFilter;
  });

  const addToCart = (id: number) => {
    if (cart.includes(id)) return;

    setAddingId(id);
    window.setTimeout(() => {
      setCart((items) => (items.includes(id) ? items : [...items, id]));
      setAddingId(null);
    }, 700);
  };

  const removeFromCart = (id: number) => {
    setCart((items) => items.filter((item) => item !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const resetFilters = () => {
    setQuery('');
    setFilter('Все');
  };

  return (
    <Wrap>
      <Top>
        <div>
          <Title>Тест</Title>
          <Text>20 карточек, все варианты кнопок и управление корзиной.</Text>
        </div>
        <CartBox>
          <Badge $variant="primary">В корзине: {cart.length}</Badge>
          <Button $size="sm" $variant="danger" disabled={cart.length === 0} onClick={clearCart}>
            Очистить корзину
          </Button>
        </CartBox>
      </Top>
      <Section>
        <SectionTitle>Кнопки и тема</SectionTitle>
        <Row>
          <Button $variant="outline" onClick={toggle}>
            Включить {mode === 'dark' ? 'светлую' : 'тёмную'} тему
          </Button>
        </Row>
      </Section>
      <Toolbar>
        <Field>
          <Label>Поиск</Label>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Поиск по тестовому каталогу"
          />
        </Field>
        <Button
          $size="sm"
          $variant="secondary"
          disabled={query === ''}
          onClick={() => setQuery('')}>
          Очистить поиск
        </Button>
        <FilterBlock>
          <Label>Категория</Label>
          <Filters>
            {filters.map((item) => (
              <Button
                key={item}
                $size="sm"
                $variant={filter === item ? 'primary' : 'secondary'}
                onClick={() => setFilter(item)}>
                {item}
              </Button>
            ))}
          </Filters>
        </FilterBlock>
      </Toolbar>

      {visibleProducts.length === 0 ? (
        <Empty>
          <EmptyTitle>Ничего не найдено</EmptyTitle>
          <EmptyText>Измените запрос или выберите другую категорию.</EmptyText>
          <EmptyAction>
            <Button $size="sm" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </EmptyAction>
        </Empty>
      ) : (
        <TestGrid $min="200px">
          {visibleProducts.map((product) => {
            const inCart = cart.includes(product.id);

            return (
              <Card key={product.id}>
                <BadgeRow>
                  {product.isNew && <Badge $variant="primary">Новинка</Badge>}
                  <Badge>{product.category}</Badge>
                </BadgeRow>
                <ProductTitle>{product.title}</ProductTitle>
                <Price>{formatPrice(product.price)}</Price>
                <CardActions>
                  <Button
                    $size="sm"
                    $loading={addingId === product.id}
                    disabled={inCart}
                    onClick={() => addToCart(product.id)}>
                    В корзину
                  </Button>
                  {inCart && (
                    <Button
                      $size="sm"
                      $variant="danger"
                      onClick={() => removeFromCart(product.id)}>
                      Удалить
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          })}
        </TestGrid>
      )}
    </Wrap>
  );
}
