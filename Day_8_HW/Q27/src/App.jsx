import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import CartView from './components/CartView';

export default function App() {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="page shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Global cart management</p>
          <h1>One cart, shared across product and cart views.</h1>
          <p className="lead">Add items from the catalog, update quantities, remove them, and see totals recalculate instantly.</p>
        </div>
        <div className="summary-card">
          <span>Total items</span>
          <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong>
          <span>Total price</span>
          <strong>₹{total.toLocaleString('en-IN')}</strong>
        </div>
      </header>

      <main className="grid two-col">
        <ProductList />
        <CartView />
      </main>
    </div>
  );
}
