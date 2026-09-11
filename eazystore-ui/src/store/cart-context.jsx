import { createContext, useContext, useEffect, useReducer } from "react";

// // STEP 2
// export const initialCartContext = {
//   cart: [],
//   setCart: () => {},
//   addToCart: () => {
//     console.log("Product added to the cart.");
//   },
//   removeFromCart: () => {},
//   totalQuantity: 0,
// };

// STEP 1
export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (prevCart, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { product, quantity } = action.payload;

      const existingItem = prevCart.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity }];

    case REMOVE_FROM_CART:
      return prevCart.filter(
        (item) => item.productId !== action.payload.productId,
      );
    case CLEAR_CART:
      return [];
    default:
      return prevCart;
  }
};

// STEP 3
export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or as an empty array
  // Moving to reducer initial state
  // const [cart, setCart] = useState(() => {
  //   try {
  //     const storedCart = localStorage.getItem("cart");
  //     return storedCart ? JSON.parse(storedCart) : [];
  //   } catch (error) {
  //     console.error("Failed to parse cart from localStorage:", error);
  //     return [];
  //   }
  // });

  //initial cart state for reducer
  const initialCartState = (() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  })();

  // Iniitiaze reducer with initial cart state below
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    // Moving this add to cart logic to reducer
    // setCart((prevCart) => {
    //   const existingItem = prevCart.find(
    //     (item) => item.productId === product.productId,
    //   );

    //   if (existingItem) {
    //     // Use map() to create a new array with updated quantity
    //     return prevCart.map((item) =>
    //       item.productId === product.productId
    //         ? { ...item, quantity: item.quantity + quantity }
    //         : item,
    //     );
    //   }

    //   // If the product is not in the cart, add it
    //   return [...prevCart, { ...product, quantity }];
    // });

    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  // // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    // setCart((prevCart) =>
    //   prevCart.filter((item) => item.productId !== productId),
    // );
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
  };

  // Function to clear all the items in the cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // Calculate total quantity
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
