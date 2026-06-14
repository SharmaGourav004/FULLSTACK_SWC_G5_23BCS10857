import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store';

export default function CartView() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <section className="panel">
      <h2>Cart Page</h2>
      {cart.length === 0 ? (
        <p className="empty-state">Your cart is empty. Add products from the left panel.</p>
      ) : (
        <div className="card-list">
          {cart.map((item) => (
            <article className="cart-row" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString('en-IN')} each</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: e.target.value }))}
              />
              <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
              <button className="ghost" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
