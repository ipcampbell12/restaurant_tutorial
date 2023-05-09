import { React, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://react-http-fd0fb-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true)

  };
  //need curly brace if more than one epxression
  // Cart.items.map((item) => {
  //   if ( a> 0) {
  //     return <SomeCompoennt />
  //   }
  //   return <CartItem />
  // });

  // is equivalent to

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  //modal actions up here to keep jsx return statement lean
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );


  const cartModalContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckout && modalActions}
  </React.Fragment>

  const isSubmittingModalContent = <p>Sending order data ...</p>;

  const didSubmitModalContnet = <React.Fragment><p> Successfully sent the order! </p>;
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>
  //parens just for syntatical purposes
  return (
    <Modal onClose={props.onClose}>

      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContnet}
    </Modal>
  );
};

export default Cart;
