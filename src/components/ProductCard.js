import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { cartContext } from "../context/CartContext";

import "./styles/productCard.scss";

export default function ProductCard({ product }) {
  const { ProductID, ProductImg, ProductName, ProductPrice } = product;
  const { dispatch } = useContext(cartContext);

  return (
    <div className="productcard">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <img className="productcard-img" alt="" src={ProductImg} />
          <div className="product-left-section">
            <h3>{ProductName}</h3>
            <p>${ProductPrice}</p>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              dispatch({ type: "ADD_TO_CART", id: ProductID, product })
            }
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
