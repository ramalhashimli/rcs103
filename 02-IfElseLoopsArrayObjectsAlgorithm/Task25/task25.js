const products = [
  { id: 1, title: "Smartphone", description: "A high-end smartphone with the latest features.", price: 799.99 },
  { id: 2, title: "Laptop", description: "Powerful laptop with a large screen and fast processor.", price: 1299.99 },
  { id: 3, title: "Coffee Maker", description: "An automatic coffee maker with a built-in grinder.", price: 99.99 },
  { id: 4, title: "Headphones", description: "Wireless over-ear headphones with noise-cancellation.", price: 199.99 },
  { id: 5, title: "Smart TV", description: "55-inch 4K Smart TV with streaming apps built-in.", price: 699.99 },
];

const totalPrice = products.reduce((total, product) => total + product.price, 0);
const averagePrice = totalPrice / products.length;

console.log("Məhsulların Yekun Məbləği:", totalPrice.toFixed(2));  
console.log("Məhsulların Ortalama Məbləği:", averagePrice.toFixed(2)); 
