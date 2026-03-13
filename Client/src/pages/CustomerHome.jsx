import React, { useEffect, useState } from "react";
import { getRestaurants, getMenu, placeOrder } from "../services/api";

export default function CustomerHome() {
  const token = localStorage.getItem("token");

  const [rests, setRests] = useState([]);
  const [selectedRest, setSelectedRest] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getRestaurants().then(setRests);
  }, []);

  const loadMenu = async (rest) => {
    setSelectedRest(rest);
    const menuData = await getMenu(rest._id);
    menuData.forEach((m) => (m.qty = 0));
    setMenu(menuData);
  };

  const place = async () => {
    const items = menu
      .filter((m) => m.qty > 0)
      .map((m) => ({ menuItem: m._id, qty: m.qty }));

    if (!items.length) return alert("Select some items!");

    const result = await placeOrder({ items }, token);
    alert("Order placed: " + result._id);
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {rests.map((r) => (
          <li key={r._id}>
            <button onClick={() => loadMenu(r)}>{r.name}</button>
          </li>
        ))}
      </ul>

      {selectedRest && (
        <>
          <h3>Menu - {selectedRest.name}</h3>

          {menu.map((item) => (
            <div key={item._id}>
              {item.name} - ₹{item.price}
              <input
                type="number"
                min="0"
                value={item.qty}
                onChange={(e) => {
                  item.qty = Number(e.target.value);
                  setMenu([...menu]);
                }}
              />
            </div>
          ))}

          <button onClick={place}>Place Order</button>
        </>
      )}
    </div>
  );
}
