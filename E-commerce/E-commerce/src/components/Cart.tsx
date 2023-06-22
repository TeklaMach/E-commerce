import React, { useEffect } from 'react';
import './Cart.css';
import { Product } from '../pages/types/Types';
import { DeleteOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/Store';
import { removeFromCart, updateCartItemQuantity } from '../redux/CartReducer';
import { Link } from 'react-router-dom';

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.cartItems);

  useEffect(() => {
    saveToLocalStorage(products);
  }, [products]);

  const saveToLocalStorage = (items: Product[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const total = () => {
    let total = 0;
    products.forEach((item) => (total += item.amount * Number(item.price)));
    return total.toFixed();
  };

  const increaseQuantity = (itemId: number) => {
    dispatch(updateCartItemQuantity({ itemId, quantity: 1 }));
  };

  const decreaseQuantity = (itemId: number) => {
    dispatch(updateCartItemQuantity({ itemId, quantity: -1 }));
  };

  if (products.length === 0) {
    return (
      <div className='cart'>
        <div className="cartHeader">
          <h1>Cart is Empty</h1>
        </div>
        <div className='cartState'>
          <span>Shop all to continue shopping</span>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <h1>Cart</h1>
      {products.map((item: any) => (
        <div key={item.id} className="cartItems">
          <img className="cartItemImg" src={item.images[0]} alt={item.title} />
          <p className="cartItemTitle">{item.brand}</p>
          <p className="cartItemPrice">{Number(item.price).toFixed() + '₾'}</p>
          <div className="cartItemAmount">
            <button className="quantityButton" onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.amount}</span>
            <button className="quantityButton" onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
          <DeleteOutlined className='delete' onClick={() => dispatch(removeFromCart(item.id))} />
        </div>
      ))}
      <div className='total'>
        <span>SUBTOTAL</span>
        <span>${total()}</span>
      </div>
      <Link to="/CheckOut">
        <Button variant="contained" color="secondary">Proceed To CheckOut</Button>
      </Link>
    </div>
  );
};

export default Cart;
