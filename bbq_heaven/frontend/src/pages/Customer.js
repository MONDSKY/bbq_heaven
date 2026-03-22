

import { useEffect, useState } from "react";
import API from "../utils/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Customer() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    fetch(API + "products.php")
      .then(r => r.json())
      .then(setProducts);
  }, []);

  const add = (p) => {
    const exist = cart.find(i => i.id === p.product_id);
    if (exist) {
      setCart(cart.map(i =>
        i.id === p.product_id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, {
        id: p.product_id,
        name: p.name,
        price: Number(p.price),
        qty: 1
      }]);
    }
  };

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const createOrder = async () => {
    const res = await fetch(API + "order.php", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ user_id:1, cart })
    });

    const data = await res.json();
    setOrderId(data.order_id);
  };

  const payGCash = async () => {
    const res = await fetch(API + "payment.php", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ amount: total })
    });

    const data = await res.json();
    window.location.href = data.checkout_url;
  };

  return (
    <div className="container">

      <h2>BBQ Heaven</h2>

      {products.map(p => (
        <div key={p.product_id} className="card">
          <h3>{p.name}</h3>
          <p>₱{p.price}</p>
          <button onClick={() => add(p)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map(i => (
        <div key={i.id} className="cart-item">
          {i.name} x {i.qty}
        </div>
      ))}

      <h3>Total: ₱{total.toFixed(2)}</h3>

      <button onClick={createOrder}>Create Order</button>

      {orderId && (
        <>
          <button onClick={payGCash}>Pay with GCash</button>

          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: total.toFixed(2) }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(() => {
                window.location.href = "/receipt";
              });
            }}
          />
        </>
      )}

    </div>
  );
}