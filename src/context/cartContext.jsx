// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({children}) =>{
// const [cart, setCart] = useState([]);

// const addToCart = (product) => {
// setCart(preCart =>{
// const exists = preCart.find(item => item.id === product.id)
// if(exists){
//  return preCart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item );
 
// } else {
//  return   [...preCart, {...product, quantity:1}]
// }
// })

// };

// const removeFromCart = (id) =>{
// setCart(cart.filter(item => item.id !== id))
// }

// const updateQuantity = (id, quantity) =>{
//     setCart(preCart=> preCart.map(item => item.id === id ? {...item, quantity} : item

//     ));
// }

// const clearCart = () => setCart([])

// return(
//     <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, clearCart}}>
//       {children}
//     </CartContext.Provider>
// )

// };
// export const useCart = () => useContext(CartContext)

