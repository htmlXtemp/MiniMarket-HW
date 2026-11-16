import { useState } from 'react';
import styled from 'styled-components';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Grid } from '../ui/Grid';
import { Input } from '../ui/Input';
import { CATEGORIES, formatPrice, PRODUCTS, type ProductCategory } from '../shared/products';

type Filter = ProductCategory | 'Все';

const filters: Filter[] = ['Все', ...CATEGORIES];

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

const Cart = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
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
  width: 280px;
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

const CatalogGrid = styled(Grid)`
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

const CardAction = styled.div`
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

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Filter>('Все');
  const [addingId, setAddingId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = PRODUCTS.filter((product) => {
    const matchesCategory = category === 'Все' || product.category === category;
    const matchesQuery = product.title.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  const addToCart = (id: number) => {
    setAddingId(id);
    window.setTimeout(() => {
      setAddingId(null);
      setCartCount((count) => count + 1);
    }, 700);
  };

  const resetFilters = () => {
    setQuery('');
    setCategory('Все');
  };

  return (
    <Wrap>
      <Top>
        <div>
          <Title>Каталог</Title>
          <Text>Поиск, фильтр по категориям и сетка от 1 до 4 колонок.</Text>
        </div>
        <Cart>
          В корзине:
          <Badge $variant="primary">{cartCount}</Badge>
        </Cart>
      </Top>
      <Toolbar>
        <Field>
          <Label>Поиск</Label>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Поиск по каталогу"/>
        </Field>
        <FilterBlock>
          <Label>Категория</Label>
          <Filters>
            {filters.map((item) => (
              <Button
                key={item}
                $size="sm"
                $variant={category === item ? 'primary' : 'secondary'}
                onClick={() => setCategory(item)}>
                {item}
              </Button>
            ))}
          </Filters>
        </FilterBlock>
      </Toolbar>

      {visibleProducts.length === 0 ? (
        <Empty>
          <EmptyTitle>Ничего не найдено</EmptyTitle>
          <EmptyText>Попробуйте изменить запрос или выбрать другую категорию.</EmptyText>
          <EmptyAction>
            <Button $size="sm" onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </EmptyAction>
        </Empty>
      ) : (
        <CatalogGrid $min="200px">
          {visibleProducts.map((product) => (
            <Card key={product.id}>
              <Badge $variant={product.isNew ? 'primary' : 'neutral'}>
                {product.isNew ? 'Новинка' : product.category}
              </Badge>
              <ProductTitle>{product.title}</ProductTitle>
              <Price>{formatPrice(product.price)}</Price>
              <CardAction>
                <Button
                  $size="sm"
                  $loading={addingId === product.id}
                  onClick={() => addToCart(product.id)}>
                  В корзину
                </Button>
              </CardAction>
            </Card>
          ))}
        </CatalogGrid>
      )}
    </Wrap>
  );
}
