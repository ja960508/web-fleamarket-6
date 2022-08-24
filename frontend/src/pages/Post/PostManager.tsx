import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CheckIcon, ImageIcon, MapPinIcon } from '../../assets/icons/icons';
import withCheckLogin from '../../components/HOC/withCheckLogin';
import PageHeader from '../../components/PageHeader/PageHeader';
import { UserInfoContext } from '../../context/UserInfoContext';
import useQuery from '../../hooks/useQuery';
import { remote } from '../../lib/api';
import { useNavigate } from '../../lib/Router';
import colors from '../../styles/colors';
import { textSmall, textMedium } from '../../styles/fonts';
import { CategoryType } from '../../types/category';

function PostManager() {
  const { data: categories } = useQuery<CategoryType[]>(
    ['category'],
    async () => {
      const result = await remote('/category');
      return result.data;
    },
  );
  const [thumbnails, setThumbnails] = useState([
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661131387060_Sl_i5bb7y',
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661139595547_lEfMjTNql',
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661139603973_kt0qFS0Lc',
  ]);
  const userInfo = useContext(UserInfoContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [price, setPrice] = useState(0);

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const formData = new FormData();
    formData.append('thumbnails', files[0]);

    const res = await remote.post('product/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setThumbnails((prev) => [...prev, res.data]);
  };

  const handleWritePost = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (!(title && description && selectedCategory)) {
      alert('모든 필수 값이 입력되어야 합니다.');

      return;
    }

    const post = {
      name: title,
      price,
      description,
      thumbnails,
      categoryId: selectedCategory,
      authorId: userInfo.userId,
    };

    await remote.post('product/write', post);

    navigate('/');
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/[^0-9]/g, '');

    setPrice(Number(value));
  };

  return (
    <StyledWrapper>
      <PageHeader
        pageName="글쓰기"
        extraButton={
          <button type="submit" onClick={handleWritePost}>
            <CheckIcon />
          </button>
        }
      />
      <StyledPostForm>
        <div className="image-section">
          <label htmlFor="post_image" className="image-upload">
            <ImageIcon />
            <span>{`${thumbnails.length}/10`}</span>
          </label>
          <input
            id="post_image"
            type="file"
            onChange={onFileUpload}
            accept="image/*"
          />
          <ul className="image-list">
            {thumbnails.map((url) => (
              <li key={url}>
                <img className="post-image" src={url} alt="post_images" />
              </li>
            ))}
          </ul>
        </div>
        <div className="content-section">
          <div className="post-meta">
            <input
              className="post-title"
              type="text"
              placeholder="글 제목"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className="category-guide">
              (필수) 카테고리를 선택해주세요.
            </div>
            <ul className="categories">
              {categories?.map((item) => (
                <li
                  className={`category-item ${
                    selectedCategory === item.id && 'selected'
                  }`}
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="post-price">
            <span>₩</span>
            <input
              className="post-input"
              type="text"
              placeholder="가격(선택사항)"
              value={price.toLocaleString()}
              onChange={handlePriceChange}
            />
          </div>
          <textarea
            name="description"
            id="description"
            className="description"
            placeholder="게시글 내용을 작성해주세요"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </StyledPostForm>
      <footer>
        <MapPinIcon />
        <span className="region-name">{userInfo.region}</span>
      </footer>
    </StyledWrapper>
  );
}

export default withCheckLogin(PostManager);

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  footer {
    display: flex;
    align-items: center;
    border-top: 1px solid ${colors.gray300};
    padding: 0.5rem 1rem;

    .region-name {
      margin-left: 0.25rem;
    }
  }
`;

const StyledPostForm = styled.form`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;

  input[type='file'] {
    display: none;
  }

  .image-section {
    width: 100%;
    padding-bottom: 1.5rem;
    overflow-y: scroll;
    display: flex;

    .image-list {
      display: flex;
    }

    .image-upload {
      flex-shrink: 0;
      width: 5.25rem;
      height: 5.25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${colors.offWhite};
      border: 1px solid ${colors.gray300};
      border-radius: 8px;
      margin-right: 1rem;
    }

    .post-image {
      width: 5.25rem;
      height: 5.25rem;
      border: 1px solid ${colors.gray300};
      border-radius: 8px;
      margin-right: 1rem;
    }
  }

  .content-section {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;

    & > input {
      padding: 1.5rem 0;
    }

    .description {
      all: unset;
      padding: 1.5rem 0;
      flex: 1 1 100%;
    }
  }

  .post-meta {
    border-top: 1px solid ${colors.gray300};
    border-bottom: 1px solid ${colors.gray300};
    padding: 1.5rem 0;
    .post-title {
      width: 100%;
      padding-bottom: 1rem;
      ${textMedium}
    }

    .category-guide {
      margin-bottom: 0.5rem;
      ${textSmall}
      color: #828282;
    }

    .categories {
      display: flex;
      overflow-y: scroll;
    }

    .category-item {
      flex: 1 0 auto;
      padding: 0.25rem 1rem;
      border: 1px solid ${colors.gray300};
      color: ${colors.gray100};
      border-radius: 999px;
      margin-right: 0.25rem;
    }

    .category-item.selected {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }

  .post-price {
    padding: 1.5rem 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.gray300};

    .post-input {
      margin-left: 0.25rem;
      ${textMedium}
      width: 100%;
    }
  }
`;
