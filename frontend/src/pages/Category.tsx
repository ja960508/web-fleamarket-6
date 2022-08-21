import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader/PageHeader';
import { remote } from '../lib/api';
import { CategoryType } from '../types/category';
import colors from '../styles/colors';
import { textXSmall } from '../styles/fonts';
import { LinkButton } from '../lib/Router';

function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    (async function () {
      const result = await remote('/category');
      setCategories(result.data);
    })();
  }, []);

  return (
    <main>
      <PageHeader pageName="카테고리" />
      <CategoryIconList>
        {categories.map(({ id, name, thumbnail }) => (
          <LinkButton
            moveTo={`/?category=${id}`}
            className="icon-button"
            key={id}
          >
            <img src={thumbnail} alt={`${name}-thumbnail`} />
            <span>{name}</span>
          </LinkButton>
        ))}
      </CategoryIconList>
    </main>
  );
}
const CategoryIconList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem 1rem;

  padding: 3rem 0;

  & > .icon-button {
    justify-self: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    & > img {
      width: 2.5rem;
      height: 2.5rem;
    }

    & > span {
      color: ${colors.black};
      ${textXSmall};
    }
  }
`;

export default Category;
