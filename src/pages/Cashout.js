import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { userAuthContext } from "../context/UserAuthContext";
import { cartContext } from "../context/CartContext";
import AlertMessage from '../components/AlertMessage'

import "./styles/cashout.scss";

export default function Cashout() {
  const { handleUserInfo, userInfo, error } = useContext(userAuthContext);
  const { shoppingCart, totalPrice, totalQty, cashoutSubmit } =
    useContext(cartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    cashoutSubmit({ totalPrice, totalQty, userInfo });
  };
  return (
    <div className="cashout-content">
      <h3>Cashout Details</h3>
      <br />
      {error && (
        <AlertMessage error={error}/>
      )}
      <br />
      <form className="cashout-form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          onChange={(e) => handleUserInfo(e)}
          required
          id="outlined-required"
          label="Name"
          name="name"
        />
        <TextField
          onChange={(e) => handleUserInfo(e)}
          required
          type="email"
          id="outlined-required"
          label="Email"
          name="email"
        />
        <TextField
          onChange={(e) => handleUserInfo(e)}
          required
          id="outlined-required"
          label="celphone"
          name="celphone"
        />
        <TextField
          onChange={(e) => handleUserInfo(e)}
          required
          id="outlined-required"
          label="Delivery Address"
          name="address"
        />
        <TextField
          required
          id="outlined-required"
          label="Price to pay"
          name="total price"
          value={totalPrice}
          disabled={true}
        />
        <TextField
          required
          id="outlined-required"
          label="Total number of products"
          value={totalQty}
          disabled={true}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <List className="cart-list" dense={true}>
        {shoppingCart.length > 0 &&
          shoppingCart.map((product) => {
            const { ProductImg, ProductName, ProductPrice, ProductID } =
              product;
            return (
              <ListItem key={ProductID}>
                <ListItemAvatar>
                  <img className="productcard-img" alt="" src={ProductImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={ProductName}
                  secondary={`$${ProductPrice}`}
                />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}
