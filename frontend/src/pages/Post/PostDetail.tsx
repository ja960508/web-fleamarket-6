import styled from 'styled-components';
import { HeartIcon, MoreVerticalIcon } from '../../assets/icons/icons';
import DropDown from '../../components/commons/Dropdown';
import PageHeader from '../../components/PageHeader/PageHeader';
import ImageSlider from '../../components/Post/ImageSlider';
import useQuery from '../../hooks/useQuery';
import { remote } from '../../lib/api';
import { Link, useNavigate, usePathParams } from '../../lib/Router';
import colors from '../../styles/colors';
import {
  textLarge,
  textMedium,
  textSmall,
  textXSmall,
} from '../../styles/fonts';
import mixin from '../../styles/mixin';
import { ProductDetail } from '../../types/product';
import { parseDateFromNow } from '../../utils/parse';

function PostDetail() {
  const navigate = useNavigate();
  const { id } = usePathParams();
  const { data: postDetail } = useQuery<ProductDetail>(
    'postDetail' + id,
    async () => {
      const { data } = await remote(`/product/${id}`);
      return data;
    },
    [id],
  );

  const handleDelete = () => {
    navigate('/');
  };

  const handleModify = () => {
    navigate(`/post/manage?productId=${id}`);
  };

  const productManageOptions = [
    {
      text: '수정하기',
      onClick: handleModify,
    },
    { text: '삭제하기', onClick: handleDelete },
  ];

  if (!postDetail) {
    return <PageHeader pageName="상품 상세" />;
  }

  const {
    name,
    price,
    isSold,
    authorName,
    description,
    createdAt,
    categoryName,
    viewCount,
    chatCount,
    likeCount,
    regionName,
  } = postDetail;

  return (
    <>
      <PageHeader
        pageName="상품 상세보기"
        extraButton={
          <DropDown
            initialDisplay={<MoreVerticalIcon />}
            dropDownElements={productManageOptions}
          />
        }
      />
      <ImageSlider />
      <StyledPostDetail>
        <div className="sale-status">{isSold ? '판매완료' : '판매중'}</div>
        <h1>{name}</h1>
        <BoxWithDelimiter>
          <span>{categoryName}</span>
          <i className="delimiter" />
          <span>{parseDateFromNow(createdAt)}</span>
        </BoxWithDelimiter>
        <p>{description}</p>
        <BoxWithDelimiter>
          <span>관심 {likeCount}</span>
          <i className="delimiter" />
          <span>조회 {viewCount}</span>
        </BoxWithDelimiter>
        <SellerInfo>
          <span>판매자 정보</span>

          <span className="product-author">{authorName}</span>
          <span className="product-region">{regionName}</span>
        </SellerInfo>
      </StyledPostDetail>
      <PostFooter>
        <div>
          <button type="button">
            <HeartIcon />
          </button>
          <span className="delimiter-vertical" />
          <span className="product-price">{price.toLocaleString()}</span>
        </div>
        <Link to="/chat" className="chat-link">
          채팅 목록 보기 {chatCount && `(${chatCount})`}
        </Link>
      </PostFooter>
    </>
  );
}

const StyledPostDetail = styled.main`
  display: flex;
  flex-direction: column;

  padding: 1.5rem 1rem;

  & > h1 {
    ${textLarge};
    ${mixin.textEllipsis(1)}
    margin: 1rem 0 0.5rem 0;
  }
  & > p {
    ${textMedium};
    margin: 1rem 0 1.5rem 0;
  }

  .sale-status {
    width: fit-content;
    padding: 0.625rem 1rem;
    border: 1px solid ${colors.gray300};
    border-radius: 8px;
    ${textSmall};
  }
`;

const BoxWithDelimiter = styled.div`
  display: flex;
  align-items: center;

  & > span {
    ${textXSmall};
    color: ${colors.gray100};
  }
  & > .delimiter {
    background-color: ${colors.gray100};
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    margin: 0 0.25rem;
  }
`;

const SellerInfo = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background-color: ${colors.offWhite};

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  & > span:first-child {
    margin-right: auto;
  }

  & > span {
    ${textSmall};
    font-weight: 500;
  }

  & > span.product-region {
    ${textXSmall};
    color: ${colors.gray100};
  }
`;

const PostFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  border: 1px solid ${colors.gray200};

  & > div {
    display: flex;
    align-items: center;

    .delimiter-vertical {
      width: 1px;
      height: 2rem;
      background-color: ${colors.gray200};
      margin: 0 1rem;
    }

    .product-price {
      ${textSmall};

      &::after {
        content: '원';
      }
    }
  }

  & .chat-link {
    padding: 0.625rem 2rem;
    background-color: ${colors.primary};
    color: ${colors.white};
    border-radius: 8px;
  }
`;

export default PostDetail;
