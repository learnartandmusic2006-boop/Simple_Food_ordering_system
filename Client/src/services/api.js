const API_URL = import.meta.env.VITE_API_URL;

export const request = async (path, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// Auth
export const register = (payload) => request("/auth/register", "POST", payload);
export const login = (payload) => request("/auth/login", "POST", payload);

// Public
export const getRestaurants = () => request("/public/restaurants");
export const getMenu = (id) => request(`/public/menu/${id}`);

// Customer
export const placeOrder = (payload, token) =>
  request("/customer/order", "POST", payload, token);
export const getCustomerOrders = (token) =>
  request("/customer/orders", "GET", null, token);

// Owner
export const addMenuItem = (payload, token) =>
  request("/owner/menu", "POST", payload, token);
export const getOwnerOrders = (token) =>
  request("/owner/orders", "GET", null, token);
export const updateOrderStatus = (id, status, token) =>
  request(`/owner/orders/${id}/status`, "PATCH", { status }, token);

