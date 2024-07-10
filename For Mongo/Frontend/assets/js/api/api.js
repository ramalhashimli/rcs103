export const getData = async () => {
  const res = await axios("https://fakestoreapi.com/products");
  const data = await res.data;

  return data;
};
