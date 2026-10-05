import React from 'react';

const ProductList = ({ products, loading, error, addToCart }) => {
  if (loading) return <h3>Loading products...</h3>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="card">
      <h3>Product Store</h3>
      {products.length === 0 ? (
        <p>No products available. Add some using the form above!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;