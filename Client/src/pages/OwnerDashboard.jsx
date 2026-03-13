import React, { useEffect, useState } from "react";
import { addMenuItem, getOwnerOrders, updateOrderStatus } from "../services/api";

export default function OwnerDashboard({ user }) {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOwnerOrders(token).then(setOrders);
  }, []);

  const addItem = async () => {
    const name = prompt("Item name:");
    const price = parseFloat(prompt("Price:"));
    await addMenuItem({ name, price }, token);
    alert("Added!");
  };

  const changeStatus = async (id) => {
    const status = prompt("Enter status: preparing/ready/completed");
    await updateOrderStatus(id, status, token);
    setOrders(await getOwnerOrders(token));
  };

  return (
    <div>
      <h2>Restaurant Owner Panel</h2>
      <button onClick={addItem}>Add Menu Item</button>

      <h3>Orders</h3>
      {orders.map((o) => (
        <div key={o._id}>
          Order: {o._id} — Status: {o.status}
          <button onClick={() => changeStatus(o._id)}>Change</button>
        </div>
      ))}
    </div>
  );
}
