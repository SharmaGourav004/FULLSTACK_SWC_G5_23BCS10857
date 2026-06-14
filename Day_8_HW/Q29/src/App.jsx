import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { products, resetFilters, setCategory, setMaxPrice, setMinPrice, setRating } from './store';

export default function App() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = filters.category === 'All' || product.category === filters.category;
      const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const ratingMatch = product.rating >= filters.rating;
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [filters]);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  return (
    <div className="page shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Dynamic product filtering</p>
          <h1>Combine category, price, and rating filters without losing state.</h1>
          <p className="lead">This interface persists filter settings in local storage, so refreshes and navigation keep the same search context.</p>
        </div>
        <button className="ghost reset" onClick={() => dispatch(resetFilters())}>Reset filters</button>
      </header>

      <main className="layout">
        <aside className="panel filters">
          <h2>Filters</h2>

          <label>
            Category
            <select value={filters.category} onChange={(e) => dispatch(setCategory(e.target.value))}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            Min price
            <input type="number" min="0" value={filters.minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))} />
          </label>

          <label>
            Max price
            <input type="number" min="0" value={filters.maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} />
          </label>

          <label>
            Minimum rating: {filters.rating.toFixed(1)}
            <input type="range" min="0" max="5" step="0.1" value={filters.rating} onChange={(e) => dispatch(setRating(e.target.value))} />
          </label>
        </aside>

        <section className="panel results">
          <div className="results-head">
            <h2>Products</h2>
            <span>{filteredProducts.length} matches</span>
          </div>

          <div className="grid cards">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                </div>
                <div className="meta">
                  <strong>₹{product.price.toLocaleString('en-IN')}</strong>
                  <p>Rating {product.rating.toFixed(1)}</p>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && <p className="empty">No products match the selected filters.</p>}
        </section>
      </main>
    </div>
  );
}
