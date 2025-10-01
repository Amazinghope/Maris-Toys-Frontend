import { useEffect, useState } from "react";
import { fetchOrderById } from "../api/orderApi";
import { useParams } from "react-router-dom";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };
    loadOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order #{order._id}</h1>
      <p>Total: ₦{order.totalPrice}</p>
      <ul>
        {order.items.map((it, idx) => (
          <li key={idx}>
            {it.name} - {it.qty} × ₦{it.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetail;
