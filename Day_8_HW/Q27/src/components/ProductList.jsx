import { useDispatch } from 'react-redux';
import { addToCart, products } from '../store';

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <section className="panel">
      <h2>Product Page</h2>
      <div className="card-list">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
          </article>
        ))}
      </div>
    </section>
  );
}
