import React, { createContext, useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/Config";

export const productsContext = createContext();

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchingProducts = [];
    onSnapshot(collection(db, "products"), (snapshot) => {
      snapshot.docs.map((doc) => {
        fetchingProducts.push({
          ProductID: doc.id,
          ProductName: doc.data().productName,
          ProductPrice: doc.data().productPrice,
          ProductImg: doc.data().url,
        });
      });
      setProducts(fetchingProducts);
    });
  };

  const addProduct = ({ productImg, productName, productPrice }) => {
    const productsCollectionRef = collection(db, "products");
    const imageRef = ref(storage, productImg.name);
    uploadBytes(imageRef, productImg)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            await addDoc(productsCollectionRef, {
              productName,
              productPrice,
              url,
            });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <productsContext.Provider value={{ products: [...products], addProduct }}>
      {children}
    </productsContext.Provider>
  );
}
