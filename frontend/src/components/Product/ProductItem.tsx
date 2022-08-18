import { HeartIcon, MessageSquareIcon } from '../../assets/icons/icons';
import { StyledProductItem } from './ProductItem.style';
import { ProductPreviewType } from '../../types/product';

function ProductItem({ product }: { product: ProductPreviewType }) {
  return (
    <StyledProductItem>
      <div>
        <img src={product.thumbnail} alt="product_thumbnail" />
      </div>
      <div className="product-meta">
        <h4 className="product-name">{product.name}</h4>
        <div className="product-time-region">
          <span>{product.regionName}</span>
          <span className="delimiter"></span>
          <span>{product.createdAt.length}</span>
        </div>
        <strong className="product-price">{product.price}</strong>
        <div className="product-count-group">
          <span>
            <MessageSquareIcon /> 2
          </span>
          <span>
            <HeartIcon /> 1
          </span>
        </div>
      </div>

      <button className="like-button" type="button">
        <HeartIcon />
      </button>
    </StyledProductItem>
  );
}

export default ProductItem;
