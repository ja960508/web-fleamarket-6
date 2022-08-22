import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { CheckIcon, ImageIcon } from '../../assets/icons/icons';
import PageHeader from '../../components/PageHeader/PageHeader';
import { CategoryContext } from '../../context/CategoryContext';
import colors from '../../styles/colors';
import { textSmall, textMedium } from '../../styles/fonts';

function PostManager() {
  const [thumbnails, setThumbnails] = useState<string[]>([
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661131387060_Sl_i5bb7y',
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661139595547_lEfMjTNql',
    'https://web-flea-6.s3.ap-northeast-2.amazonaws.com/1661139603973_kt0qFS0Lc',
  ]);
  const categories = useContext(CategoryContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [price, setPrice] = useState(0);

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const formData = new FormData();
    formData.append('thumbnails', files[0]);

    console.log(files[0]);
    console.log(formData);
    const res = await axios.post(
      'http://localhost:4000/product/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    setThumbnails((prev) => [...prev, res.data]);
  };

  const handleWritePost = (event: React.FormEvent<HTMLFormElement>) => {
    if (!(event.target instanceof HTMLFormElement)) return;
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/[^0-9]/g, '');

    setPrice(Number(value));
  };

  const handleSelectCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) =>
        prev.filter((item) => item !== categoryId),
      );
    } else {
      setSelectedCategories((prev) => [...prev, categoryId]);
    }
  };

  return (
    <>
      <PageHeader
        pageName="글쓰기"
        extraButton={
          <button type="submit">
            <CheckIcon />
          </button>
        }
      />
      <StyledPostForm onSubmit={handleWritePost}>
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
              {categories.map((item) => (
                <li
                  className={`category-item ${
                    selectedCategories.includes(item.id) && 'selected'
                  }`}
                  key={item.id}
                  onClick={() => handleSelectCategory(item.id)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="post-price">
            <span>{`₩ `}</span>
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
    </>
  );
}

export default PostManager;

const StyledPostForm = styled.form`
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
    display: flex;
    flex-direction: column;

    & > input {
      padding: 1.5rem 0;
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

    input {
      ${textMedium}
      width: 100%;
    }
  }

  .description {
    all: unset;
    padding: 1.5rem 0;
  }
`;
