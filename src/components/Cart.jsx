import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card">
      <h3>Shopping Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div>
                <strong>{item.name}</strong> - ₹{item.price} x {item.quantity}
              </div>
              <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total Amount: ₹{totalAmount}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;