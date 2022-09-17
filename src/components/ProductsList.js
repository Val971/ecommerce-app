import React, { useContext } from "react";

import { productsContext } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import "./styles/productList.scss";

export default function ProductsList() {
  const { products } = useContext(productsContext);

  return (
    <div className="productlist">
      {products.length === 0 && <p>No data</p>}
      {products.length > 0 &&
        products.map((product) => {
          return <ProductCard key={product.ProductID} product={product} />;
        })}
    </div>
  );
}
