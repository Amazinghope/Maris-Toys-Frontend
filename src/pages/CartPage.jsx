import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { increaseQty, decreaseQty, removeFromCart,  } from "../redux/cartSlice";
import { selectCartItems, selectCartTotals } from "../redux/cartSlice";
import { formatCurrency } from "../utils/formatCurrency";

function CartPage(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productDetailed = useSelector(selectCartItems)
  const total = useSelector(selectCartTotals)

  if(productDetailed.length === 0){
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <Link to="/" className="px-4 py-2 rounded-xl border inline-block">
          Continue shopping
        </Link>
      </div>
    )
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid cols-[1fr_380px] gap-8 ">
      {/* Cart Items */}
      <div className="space-y-4">
       {productDetailed.map(({product, qty})=>(
        <div
        key={product._id}
        className="flex gap-4 border rounded-2xl p-3 items-center"
        >
          <div className="w-28 h-24 rounded-xl overflow-hidden bg-gray-100">
           <img 
           src={product.image}
            alt= {product.name}
            className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
           <div className="font-medium">{product.name}</div>
           <div className="text-sm text-gray-600">
            {formatCurrency(product.price)} . Age{product.age}
           </div>

           <div className="flex items-center gap-2 mt-2">
            {/* Decrease */}
            <button 
            className="px-2 py-1 rounded-lg border"
            onClick={()=> dispatch(decreaseQty({id: product._id}))}
            >
             -
            </button>

             {/* Qty */}
             <span className="min-w-8 text-center">{qty}</span>
             {/* Increase */}
             <button
             className="px-2 py-1 rounded-lg border"
             onClick={()=> dispatch(increaseQty({id: product._id}))}
             >
              +
             </button>

             {/* Remove */}

             <button
             className="ml-3 px-2 py-1 rounded-lg border text-red-600"
             onClick={()=> dispatch(removeFromCart({id: product._id}))}
             >
            Remove
             </button>

           </div>
          </div>
          {/* Line total */}

         <div className="text-right font-semibold">
         {formatCurrency(product.price * qty)}
         </div>
        </div>
       ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded-2xl p-5 h-fit sticky top-24">
       <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
       <div className="space-y-2 text-sm">
        <SummaryRow label= "Subtotal" value={formatCurrency(total.subTotal)}/>

        <SummaryRow label="Shipping Fee" value={total.shippingFee === 0 ? "free" : formatCurrency(total.shippingFee)} />

        <SummaryRow label= "VAT (3.5%)" value={formatCurrency(total.tax)} />

        <div className="border-t pt-2 font-semibold flex items-center justify-between">
         <span>Total</span>
         <span> {formatCurrency(total.subTotal)} </span>
        </div>
       </div>

       <div className="mt-4 flex gap-2">
        <button 
        onClick={()=> navigate('/checkout')}
        className="flex-1 px-4 py-2 rounded-xl bg-black text-white"
        >
          Checkout
        </button>

        <button
        className="px-4 py-2 rounded-xl border"
        onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
       </div>
      </div>
    </div>
  )

}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default CartPage

// const CartPage = () => {
//  const {cart, removeFromCart, updateQuantity} = useCart();

//  const handleQuantity = (id, value) =>{
//     if (value >= 1) updateQuantity(id, value)
//  };

//  const total = cart.reduce((acct, item) => acct + item.price * item.quantity, 0);

//     return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//        {cart.length === 0 ? (
//         <p>Your cart is empty. <Link to='/' className="text-blue-500 underline">Shop Now</Link></p>

//        ) : (
//         <div className="space-y-4">
//             {cart.map(item => (
//              <div key={item.id} className="flex justify-between items-center border-b pb-4">
            
//              <div>
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p>${item.price} x {item.quantity}</p>
//              </div>

//               <div className="flex gap-2 items-center">
//                 <input 
//                 type="number"
//                 value={item.quantity}
//                 min='1'
//                 onChange={(e)=> handleQuantity(item.id, parseInt(e.target.value))}
//                 className="w-16 px-2 py-1 border rounded"
//                 />

//                 <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">
//                     Remove
//                 </button>
//               </div>
//                  </div>
//             ))}

//             <div className="text-right font-bold text-xl">
//               Total: ${total.toFixed((2))}
//             </div>

//              <Link
//              to='/checkout'
//              className="inline-block mt-4 bg-green-600 text-white px-4 py-4 rounded hover:bg-green-700 "
//              >
//                 Proceed to Checkout
//              </Link>
//         </div>
//        )}
//     </div>
//   );
// }

// export default CartPage
