import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from './store';

export default function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.content);

  return (
    <div className="page shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Redux Thunk async loading</p>
          <h1>Fetch streaming-style content with clear API states.</h1>
          <p className="lead">This demo uses Redux Thunk to manage loading, success, and error transitions just like media apps that hydrate their dashboards asynchronously.</p>
        </div>
        <div className="actions">
          <button onClick={() => dispatch(fetchContent(false))} disabled={loading}>Load content</button>
          <button className="ghost" onClick={() => dispatch(fetchContent(true))} disabled={loading}>Simulate error</button>
        </div>
      </header>

      <main className="panel">
        {loading && <div className="state-banner loading">Loading content...</div>}
        {error && <div className="state-banner error">{error}</div>}
        {!loading && !error && items.length === 0 && (
          <div className="state-banner idle">Press a button above to fetch content.</div>
        )}
        {!loading && items.length > 0 && (
          <div className="grid cards">
            {items.map((item) => (
              <article className="content-card" key={item.id}>
                <span>{item.type}</span>
                <h2>{item.title}</h2>
                <p>Released in {item.year}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
