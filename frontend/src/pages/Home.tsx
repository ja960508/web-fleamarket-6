import axios from 'axios';
import { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import PostAddButton from '../components/Post/PostAddButton';
import ProductItem from '../components/Product/ProductItem';
import { ProductPreviewType } from '../types/product';

function Home() {
  const [products, setProducts] = useState<ProductPreviewType[]>([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/product');

      setProducts(data);
    })();
  }, []);

  return (
    <main>
      <HomeNavbar />
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      <PostAddButton />
    </main>
  );
}

export default Home;
