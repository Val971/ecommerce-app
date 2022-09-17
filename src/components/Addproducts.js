import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { productsContext } from "../context/ProductsContext";

import "./styles/addproducts.scss";

export default function Addproducts() {
  const [productImg, setProductImg] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const { addProduct } = useContext(productsContext);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImg(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ productImg, productName, productPrice });

    setProductImg(null);
    setProductName(null);
    setProductPrice(null);
  };

  return (
    <form className="addproduct" onSubmit={(e) => handleSubmit(e)}>
      <h3>Add new product</h3>
      <TextField
        onChange={(e) => setProductName(e.target.value)}
        required
        id="outlined-required"
        label="Product Name"
        value={productName}
      />
      <TextField
        onChange={(e) => setProductPrice(e.target.value)}
        required
        type="number"
        value={productPrice}
        id="outlined-required"
        label="Product Price"
      />

      <TextField
        onChange={handleImageChange}
        required
        id="outlined-required"
        type="file"
      />
      <Button type="submit" variant="contained">
        Add product
      </Button>
    </form>
  );
}
