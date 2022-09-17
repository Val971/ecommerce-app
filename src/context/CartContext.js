import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { db } from "../config/Config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  let navigate = useNavigate();
  const [cart, dispatch] = useReducer(CartReducer, {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
  });
  const cashoutSubmit = async ({ totalPrice, totalQty, userInfo }) => {
    const cashoutCollectionRef = collection(db, "buyer-info");
    await addDoc(cashoutCollectionRef, {
      BuyerName: userInfo.name,
      BuyerEmail: userInfo.email,
      BuyerCell: userInfo.celphone,
      BuyerAddress: userInfo.address,
      BuyerPayment: totalPrice,
      BuyerQuantity: totalQty,
    })
      .then(() => {
        toast.success("Your order was completed");
        dispatch({ type: "EMPTY" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <cartContext.Provider value={{ ...cart, dispatch, cashoutSubmit }}>
      <ToastContainer />
      {children}
    </cartContext.Provider>
  );
}
