import { HeartIcon, MessageSquareIcon } from '../../assets/icons/icons';
import { ProductPreviewType } from '../../types/product';
import { parseDateFromNow } from '../../utils/parse';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';
import { textMedium, textSmall } from '../../styles/fonts';
import { remote } from '../../lib/api';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';
import debounce from '../../utils/debounce';

function ProductItem({ product }: { product: ProductPreviewType }) {
  const {
    id,
    likeCount,
    createdAt,
    name,
    regionName,
    price,
    chatCount,
    isLiked,
  } = product;

  const userInfo = useContext(UserInfoContext);
  const [optimisticLikeInfo, setOptimisticLikeInfo] = useState({
    likeCount,
    isLiked,
  });

  const debouncedLikeHandler = useRef(
    debounce(async (currentIsLiked: boolean) => {
      try {
        await remote.post(`/product/${id}/like`, {
          userId: userInfo.userId,
          isLiked: !currentIsLiked,
        });
      } catch (e) {
        alert('좋아요 누르기에 실패했어요.');
        console.error(e);
      }
    }, 500),
  );

  const togglLikeInfo = () => {
    setOptimisticLikeInfo((prevData) => ({
      isLiked: !prevData.isLiked,
      likeCount: prevData.likeCount + (prevData.isLiked ? -1 : 1),
    }));
  };

  const handleLikeInfo = () => {
    if (!userInfo?.userId) {
      alert('로그인이 필요해요.');
      return;
    }

    const likeOrDislikeProduct = debouncedLikeHandler.current;

    togglLikeInfo();
    likeOrDislikeProduct(optimisticLikeInfo.isLiked);
  };

  useEffect(() => {
    setOptimisticLikeInfo({
      isLiked,
      likeCount,
    });
  }, [isLiked, likeCount]);

  return (
    <StyledProductItem isLiked={optimisticLikeInfo.isLiked}>
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
          {chatCount > 0 && (
            <span>
              <MessageSquareIcon /> {chatCount}
            </span>
          )}
          {optimisticLikeInfo.likeCount > 0 && (
            <span>
              <HeartIcon /> {optimisticLikeInfo.likeCount}
            </span>
          )}
        </div>
      </div>

      <button className="like-button" type="button" onClick={handleLikeInfo}>
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
