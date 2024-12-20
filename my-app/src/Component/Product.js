import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomProduct, setRandomProduct] = useState([]); // State for random products

  useEffect(() => {
    // Fetch the products from the WooCommerce API
    axios
      .get('http://wordpress-project.local/wp-json/wc/v3/products') // Correct URL for the API
      .then((response) => {
        setProducts(response.data);
        setLoading(false);

        // Initially set the random products
        setRandomProduct(getRandomProducts(response.data));
        
        // Set an interval to change the random products every 4 seconds
        const interval = setInterval(() => {
          setRandomProduct(getRandomProducts(response.data));
        }, 9000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      })
      .catch((err) => {
        setError('Failed to load products. Please check the API keys and endpoint.');
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Helper function to get random products from the list
  const getRandomProducts = (productList) => {
    // Shuffle the array and return the first 4 products
    const shuffled = [...productList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4); // Get the first 4 products
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-container">
      <div className="product-list">
        {randomProduct.map((product) => (
          <div key={product.id} className="product-item">
            {/* Render the product image if available */}
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]?.src} // Use the first image in the array
                alt={product.name}
                className="product-image"
              />
            )}
            <h2>{product.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: product.price_html }} />
            <a href={product.permalink} className="product-link">
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
