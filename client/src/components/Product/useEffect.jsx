import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import'../Product/list.css';

function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nezuko",
      price: "0.1",
      imgHash: "Qmbvmsjgo2qxuxZGEnD3HvXBpNnUCM8VqoZiezTCSzK7yy",
      seller: {accounts}
    },
    // Add more products here if needed
  ]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error fetching account:", error);
        }
      } else {
        console.log("MetaMask is not installed.");
      }
    };

    loadAccount();
  }, []);

  const createOrder = (productId, price) => {
    // Logic to create an order
  };

  return (
    <ProductList products={products} createOrder={createOrder} account={account} />
  );
}

export default Home;
