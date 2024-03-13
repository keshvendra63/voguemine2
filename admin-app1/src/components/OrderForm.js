import React, { useState } from 'react';

const OrderForm = ({ products, onSubmit }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = () => {
    if (!selectedProduct || !selectedSize || !selectedColor || !quantity) {
      // Handle validation
      return;
    }

    const productToAdd = {
      productId: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      quantity: parseInt(quantity)
    };
    setSelectedProducts([...selectedProducts, productToAdd]);
    resetForm();
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  const resetForm = () => {
    setSelectedProduct('');
    setSelectedSize('');
    setSelectedColor('');
    setQuantity('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedProducts);
    setSelectedProducts([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Product Selection */}
      <label htmlFor="product">Product:</label>
      <select id="product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="">Select Product</option>
        {products?.map((product) => (
          <option key={product._id} value={product._id}>{product.name}</option>
        ))}
      </select>

      {/* Size Selection */}
      <label htmlFor="size">Size:</label>
      <select id="size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option value="">Select Size</option>
        {/* Populate options based on selected product */}
      </select>

      {/* Color Selection */}
      <label htmlFor="color">Color:</label>
      <select id="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="">Select Color</option>
        {/* Populate options based on selected product */}
      </select>

      {/* Quantity */}
      <label htmlFor="quantity">Quantity:</label>
      <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      {/* Add Product Button */}
      <button type="button" onClick={handleAddProduct}>Add Product</button>

      {/* Selected Products */}
      <div>
        {selectedProducts?.map((product, index) => (
          <div key={index}>
            <span>{product.name} - {product.quantity}</span>
            <button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default OrderForm;
