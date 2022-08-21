import { HeartIcon, MessageSquareIcon } from '../../assets/icons/icons';
import { StyledProductItem } from './ProductItem.style';
import { ProductPreviewType } from '../../types/product';
import { parseDateFromNow } from '../../utils';

function ProductItem({ product }: { product: ProductPreviewType }) {
  return (
    <StyledProductItem>
      <div>
        <img src="http://source.unsplash.com/random" alt="product_thumbnail" />
      </div>
      <div className="product-meta">
        <h4 className="product-name">{product.name}</h4>
        <div className="product-time-region">
          <span>{product.regionName}</span>
          <span className="delimiter"></span>
          <span>{parseDateFromNow(product.createdAt)}</span>
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
