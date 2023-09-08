import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  addMultipleToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function addMultipleToCart(id, amount) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: amount,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + amount }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function clearCart() {
    setCartProducts([]);
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    addMultipleToCart,
    removeOneFromCart,
    deleteFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
