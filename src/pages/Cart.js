import React, { useContext } from "react";
import { cartContext } from "../context/CartContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

import { MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { IoMdRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import "./styles/cart.scss";

export default function Cart() {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(cartContext);
  let navigate = useNavigate();
  const addSection = (product) => {
    return (
      <>
        <IoMdRemoveCircleOutline
          size={40}
          onClick={() =>
            dispatch({ type: "DEC", id: product.ProductID, product })
          }
        />
        {`   ${product.qty}   `}
        <IoIosAddCircleOutline
          size={40}
          onClick={() =>
            dispatch({ type: "INC", id: product.ProductID, product })
          }
        />
      </>
    );
  };
  return (
    <div className="cart-content">
      <h3>Cart</h3>
      {shoppingCart.length === 0 && (
        <div className="cart-list-empty">
          <p>
            no items in your cart or slow internet causing trouble (Refresh the
            page) or you are not logged in
          </p>
          <p>
            <Link to="/">Return to Home page</Link>
          </p>
        </div>
      )}
      <List className="cart-list" dense={true}>
        {shoppingCart.length > 0 &&
          shoppingCart.map((product) => {
            const { ProductImg, ProductName, ProductPrice, ProductID } =
              product;
            return (
              <ListItem
                key={ProductID}
                secondaryAction={
                  <MdDelete
                    onClick={() =>
                      dispatch({ type: "DELETE", id: ProductID, product })
                    }
                    size={50}
                  />
                }
              >
                <ListItemAvatar>
                  <img className="productcard-img" alt="" src={ProductImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={ProductName}
                  secondary={`$${ProductPrice}`}
                />
                <ListItemText primary={addSection(product)} />
              </ListItem>
            );
          })}
      </List>
      {shoppingCart.length > 0 && (
        <Card className="cart-summary" sx={{ minWidth: 275 }}>
          <CardContent>
            <h3>Cart summary</h3>
            <p>Total price: ${totalPrice}</p>
            <p>Total Qty: {totalQty}</p>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate("/cashout")} variant="contained">
              Cash on delivery
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}
