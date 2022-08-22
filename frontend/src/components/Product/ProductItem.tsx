import { HeartIcon, MessageSquareIcon } from '../../assets/icons/icons';
import { ProductPreviewType } from '../../types/product';
import { parseDateFromNow } from '../../utils';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { textMedium, textSmall } from '../../styles/fonts';

function ProductItem({ product }: { product: ProductPreviewType }) {
  const { likeCount, createdAt, name, regionName, price, chatCount, isLiked } =
    product;

  return (
    <StyledProductItem isLiked={isLiked}>
      <div>
        <img src="http://source.unsplash.com/random" alt="product_thumbnail" />
      </div>
      <div className="product-meta">
        <h4 className="product-name">{name}</h4>
        <div className="product-time-region">
          <span>{regionName}</span>
          <span className="delimiter"></span>
          <span>{parseDateFromNow(createdAt)}</span>
        </div>
        <strong className="product-price">{price}</strong>
        <div className="product-count-group">
          <span>
            <MessageSquareIcon /> {chatCount}
          </span>
          <span>
            <HeartIcon /> {likeCount}
          </span>
        </div>
      </div>

      <button className="like-button" type="button">
        <HeartIcon />
      </button>
    </StyledProductItem>
  );
}

const StyledProductItem = styled.li<{ isLiked: boolean }>`
  position: relative;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${colors.gray300};

  .product-name {
    ${textMedium};
    font-weight: 500;
  }

  .product-time-region {
    ${textSmall};
    color: ${colors.gray100};
    display: flex;
    align-items: center;

    .delimiter {
      background-color: ${colors.gray100};
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      margin: 0 0.25rem;
    }
  }

  .product-price {
    font-weight: 500;
    ${textSmall};
  }

  .like-button {
    position: absolute;
    top: 1rem;
    right: 1rem;

    ${({ isLiked }) =>
      isLiked
        ? css`
            svg {
              fill: ${colors.pink};
              path {
                stroke: ${colors.pink};
              }
            }
          `
        : css`
            svg {
              fill: transparent;
            }
          `};
  }

  .product-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1 1 100%;
  }

  .product-count-group {
    align-self: flex-end;
    display: flex;
    gap: 1rem;
    span {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
  }

  img {
    width: 106px;
    height: 106px;
    border: 1px solid ${colors.gray300};
    border-radius: 10px;
  }
`;

export default ProductItem;
