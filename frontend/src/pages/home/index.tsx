import CustomButton from "../../componets/button";

const Home = () => {

  return (
    <div className="bg-black h-full p-6">
      <div className="h-80 bg-black text-white flex flex-col gap-4 items-start">
        <h1 className="text-3xl font-serif">Discover Top-Quality Products</h1>
        <p className="text-lg font-light mt-4">Explore our wide selection and find what you need.</p>
        <CustomButton>
          Shop Now
        </CustomButton>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">

        {products.map((element) => {
          return <ProductCard key={element.id} product={element} />
        })
        }
        {products.map((element) => {
          return <ProductCard key={element.id} product={element} />
        })
        }
        {products.map((element) => {
          return <ProductCard key={element.id} product={element} />
        })
        }
      </div>
    </div>
  )
}

const ProductCard = ({ product }:any) => {
  return (
    <div className="bg-white text-amber-500 dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-200">
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-gray-300">{product.description}</p>
      <p className="mt-4 text-xl font-bold">
        ${product.price}
      </p>
      {/* Add a button for adding to cart or viewing details */}
      <CustomButton>
        Add to Cart
      </CustomButton>
    </div>
  );
};

const products = [
  {
    id: 1,
    name: 'Elegant Cotton T-Shirt',
    description: 'Soft and comfortable cotton t-shirt in various colors.',
    image: '/images/product1.jpg', // Replace with actual image paths
    price: 29.99,
  },
  {
    id: 2,
    name: 'Denim Jeans',
    description: 'Classic denim jeans with a comfortable fit.',
    image: '/images/product2.jpg',
    price: 49.99,
  },
  {
    id: 3,
    name: 'Stylish Sneakers',
    description: 'Trendy sneakers for everyday wear.',
    image: '/images/product3.jpg',
    price: 79.99,
  },
  // Add more products as needed
];



export default Home