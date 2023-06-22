import * as React from 'react';
import {Typography, List, ListItem, ListItemText  } from '@mui/material';
import { Product } from './types/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
interface CartProps {
  cartItems: Product[];
}
const Review: React.FC<CartProps> = ({cartItems}) => {
  const products = useSelector((state: RootState) => state.cart.cartItems);
  const total = () => {
    let total = 0;
    products.forEach((item: { amount: number; price: any }) => (total += item.amount * Number(item.price)));
    return total.toFixed();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((item: any) => (
          <div key={item.id} className="cartItems">
            <img className="cartItemImg" src={item.images[0]} alt={item.title} />
            <p className="cartItemTitle">{item.brand}</p>
            <p className="cartItemPrice">{Number(item.price).toFixed() + '₾'}</p>
            <p className="cartItemAmount">Item Amount: {Number(item.amount)}</p>
          </div>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${total()}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Review;
