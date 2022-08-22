import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export interface CategoryType {
  id: number;
  name: string;
  thumbnail: string;
}

export const CategoryContext = createContext<CategoryType[]>([]);

function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('http://localhost:4000/category');
      setCategories(data);
    })();
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryProvider;
