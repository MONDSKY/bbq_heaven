

import { useEffect, useState } from "react";
import API from "../utils/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Customer() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(API + "products.php")
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error(err));
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

  const updateQty = (id, qty) => {
    const safeQty = isNaN(qty) ? 1 : Math.max(1, qty);
    setCart(cart.map(i =>
      i.id === id ? { ...i, qty: safeQty } : i
    ));
  };

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  const checkout = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(API + "order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          cart
        })
      })
      .then(res => res.text())
      .then(data => {
        alert("Order placed");
        console.log(data);
      })
      .catch(err => console.error(err));
    });
  };

  return (
    <div className="container">

      <h2>BBQ Heaven</h2>

      {/* PRODUCTS */}
      {products.map(p => (
        <div key={p.product_id} className="card">
          <h3>{p.name}</h3>
          <p>₱{p.price}</p>
          <button onClick={() => add(p)}>Add to Cart</button>
        </div>
      ))}

      {/* CART */}
      <h3>Cart</h3>
      {cart.map(i => (
        <div key={i.id} className="cart-item">
          <span>{i.name}</span>
          <input
            type="number"
            value={i.qty}
            onChange={e => updateQty(i.id, parseInt(e.target.value))}
          />
        </div>
      ))}

      {/* CHECKOUT */}
      <div className="navbar">
        <button onClick={checkout}>
          Checkout ₱{total.toFixed(2)}
        </button>
      </div>

      {/* PAYPAL */}
      <div style={{ marginTop: "20px" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: total.toFixed(2)
                }
              }]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(() => {
              alert("Payment successful");
            });
          }}
        />
      </div>

    </div>
  );
}