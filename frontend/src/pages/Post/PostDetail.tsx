import styled from 'styled-components';
import { HeartIcon } from '../../assets/icons/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import ImageSlider from '../../components/Post/ImageSlider';
import useQuery from '../../hooks/useQuery';
import { remote } from '../../lib/api';
import { Link, usePathParams } from '../../lib/Router';
import colors from '../../styles/colors';
import { ProductDetail } from '../../types/product';
import { parseDateFromNow } from '../../utils/parse';

function PostDetail() {
  const { id } = usePathParams();
  const { data: postDetail } = useQuery<ProductDetail>(
    'postDetail' + id,
    async () => {
      const { data } = await remote(`/product/${id}`);
      return data;
    },
    [id],
  );

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
      <PageHeader pageName="상품 상세보기" />
      <StyledPostDetail>
        <ImageSlider />
        <div className="sale-status">{isSold ? '판매완료' : '판매중'}</div>
        <h1>{name}</h1>
        <div>
          <span>{categoryName}</span>
          <span className="delimiter" />
          <span>{parseDateFromNow(createdAt)}</span>
        </div>
        <p>{description}</p>
        <div>
          <span>관심 {likeCount}</span>
          <span className="delimiter" />
          <span>조회 {viewCount}</span>
        </div>
        <div>
          <span>판매자 정보</span>

          <span>{authorName}</span>
          <span>{regionName}</span>
        </div>
        <footer>
          <HeartIcon />
          <span>{price}</span>
          <Link to="/chat" className="chat-link">
            채팅 목록 보기 {chatCount && `(${chatCount})`}
          </Link>
        </footer>
      </StyledPostDetail>
    </>
  );
}

const StyledPostDetail = styled.main`
  .delimiter {
    background-color: ${colors.gray100};
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
    margin: 0 0.25rem;
  }

  .chat-link {
    padding: 0.625rem 2.5rem;
    background-color: ${colors.primary};
    color: ${colors.white};
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

export default PostDetail;
