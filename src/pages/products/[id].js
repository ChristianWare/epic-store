import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { stripe } from "src/utils/stripe";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

const ProductPage = ({ product }) => {
  const [count, setCount] = useState(1);
  const { addItem } = useShoppingCart();

  function onAddToCart(event) {
    event.preventDefault();
    const id = toast.loading(`Adding ${count} item${count > 1 ? "s" : ""}`);
    addItem(product, { count });
    toast.success(`${count} ${product.name} added`, { id });
  }

  return (
    <div className='container lg:max-w-screen-lg mx-auto py-12 px-6'>
      <div className='felx flex-col md:flex-row justify-between items-center space-y-8 md:space-x-12'>
        <div className='relative w-72 h-72 sm:w-96 sm:h-96'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            objectFit='contain'
            sizes='100%'
            priority
          />
        </div>
        <h2>{product.name}</h2>
        <p>In Stock</p>
        <p>
          Price:{" "}
          {formatCurrencyString({
            value: product.price,
            currency: product.currency,
          })}
        </p>

        <div className='mt-4 border-t pt-4'>
          <p>Quantity:</p>
          <div className='mt-1 flex items-center space-x-3'>
            <button
              disabled={count <= 1}
              onClick={() => setCount(count - 1)}
              className='p-1 rounded-md hover:bg-rose-100 hover:text-rose-500 w-6 h-6 text-4xl'
            >
              -
            </button>
            <p className='text-2xl'>{count}</p>
            <button
              onClick={() => setCount(count + 1)}
              className='p-1 rounded-md hover:bg-green-100 hover:text-green-500 w-6 h-6 text-4xl'
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className='mt-4 border border-lime-500 px-6 py-2 rounded-md'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductPage;

export async function getStaticPaths() {
  const inventory = await stripe.products.list();
  const paths = inventory.data.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const inventory = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = inventory.data.map((product) => {
    const price = product.default_price;
    return {
      currency: price.currency,
      id: product.id,
      name: product.name,
      price: price.unit_amount,
      image: product.images[0],
    };
  });

  const product = products.find((product) => product.id === params.id);

  return {
    props: {
      product,
    },
    revalidate: 60 * 60,
  };
}
