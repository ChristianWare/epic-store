import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

const CartProduct = ({ product }) => {
  const { setItemQuantity, removeItem } = useShoppingCart();

  return (
    <div className='flex justify-between space-x-4 hover:shadow-lg'>
      <Link
        href={`/products/${product.id}`}
        className='flex items-center space-x-4 group'
      >
        <div className='relative w-20 h-20 group-hover:scale-110 transition-transform'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            objectFit='contain'
          />
        </div>
        <p className='font-semibold text-xl group-hover:underline'>
          {product.name}
        </p>
      </Link>
      <div className='flex items-center'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => setItemQuantity(product.id, product.quantity - 1)}
            disabled={product.quantity <= 1}
            className='p-1 rounded-md hover:bg-rose-100 hover:text-rose-500 w-6 h-6 text-4xl'
          >
            -
          </button>
          <p className='text-2xl'>{product.quantity}</p>
          <button
            onClick={() => setItemQuantity(product.id, product.quantity + 1)}
            className='p-1 rounded-md hover:bg-green-100 hover:text-green-500 w-6 h-6 text-4xl'
          >
            +
          </button>
        </div>
        <p className='font-semibold text-xl ml-16'>
          <span className='w-4 h-4 text-gray-500 mr-4 mb-'>
            item(s) multiplied by
          </span>
          {product.formattedPrice}
        </p>
        <button
          onClick={() => removeItem(product.id)}
          className='ml-4 hover:text-red-500'
        >
          X
        </button>
      </div>
    </div>
  );
};
export default CartProduct;
