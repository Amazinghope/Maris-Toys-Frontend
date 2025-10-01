import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/cartSlice"

export default function ProductCard({product}) {
    const dispatch = useDispatch()
    const items = useSelector((state)=>state.cart.items)

    const inCart = items[product._id]
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <button onClick={() => dispatch(addToCart({product, qty: 1}))}>
       {inCart? 'Add More': 'Add To Cart'}
      </button>
    </div>
  )
}
