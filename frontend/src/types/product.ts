export interface ProductPreviewType {
  id: number;
  thumbnail: string;
  likeCount: number;
  createdAt: string;
  isSold: boolean;
  authorId: number;
  name: string;
  regionName: string;
  price: number;
  chatCount: number;
  isLiked: boolean;
}

export interface ProductDetail extends ProductPreviewType {
  categoryId: number;
  categoryName: string;
  authorName: string;
  description: string;
  viewCount: number;
}
