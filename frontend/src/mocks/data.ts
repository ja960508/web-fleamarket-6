export function categoryGenerator() {
  return ['디지털기기', '생활가전', '가구/인테리어', '식물', '스포츠/레저'];
}

export function userGenerator() {
  return {
    id: 1,
    name: '김당근',
    regionId: 1,
    regionName: '방이동',
  };
}

// source.unsplash.com/random
export function productGenerator(id?: number) {
  const thumbnail = 'source.unsplash.com/random';
  const result = [];
  const categories = [
    '디지털기기',
    '생활가전',
    '가구/인테리어',
    '식물',
    '스포츠/레저',
  ];

  for (let i = 0; i < 10; i++) {
    const product = {
      id: i,
      thumbnail,
      likeCount: Math.floor(Math.random() * 10),
      createAt: new Date(),
      isSold: Math.random() > 0.5,
      category: Math.floor(Math.random() * categories.length),
      author: '사용자' + i,
      name: `상품${i}`,
      regionName: '방이동',
      price: Math.ceil(((Math.random() * 50000) / 1000) * 1000),
      chatCount: Math.floor(Math.random() * 10),
    };

    result.push(product);
  }

  return id ? result[id] : result;
}
