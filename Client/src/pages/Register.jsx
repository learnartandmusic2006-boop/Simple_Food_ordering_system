import React, { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    restaurantName: "",
    address: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(info);
      alert("Registered!");
      nav("/login");
    } catch (err) {
      alert(err.msg);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
               onChange={(e) => setInfo({ ...info, name: e.target.value })} />

        <input placeholder="Email"
               onChange={(e) => setInfo({ ...info, email: e.target.value })} />

        <input type="password" placeholder="Password"
               onChange={(e) => setInfo({ ...info, password: e.target.value })} />

        <select onChange={(e) => setInfo({ ...info, role: e.target.value })}>
          <option value="customer">Customer</option>
          <option value="owner">Restaurant Owner</option>
        </select>

        {info.role === "owner" && (
          <>
            <input placeholder="Restaurant Name"
                   onChange={(e) => setInfo({ ...info, restaurantName: e.target.value })} />

            <input placeholder="Address"
                   onChange={(e) => setInfo({ ...info, address: e.target.value })} />
          </>
        )}

        <button>Register</button>
      </form>
    </div>
  );
}
