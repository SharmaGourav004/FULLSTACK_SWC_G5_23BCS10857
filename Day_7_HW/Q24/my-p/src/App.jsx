
import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch API Data
  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/posts")

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })

      .then((data) => {
        setProducts(data.slice(0, 12));
        setLoading(false);
      })

      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="status">
        <h1>Loading data...</h1>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="status">
        <h1>Error: {error}</h1>
      </div>
    );
  }

  // Main UI
  return (
    <div className="container">

      <h1 className="title">
        Product Dashboard
      </h1>

      <div className="grid">

        {products.map((item) => (

          <div className="card" key={item.id}>

            <h2>
              {item.title}
            </h2>

            <p>
              {item.body}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;

