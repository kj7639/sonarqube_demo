import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BugHuntApp() {
  // State for login functionality
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for search and cart
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  // Sample products
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Headphones" },
  ];

  // Login handler
  const handleLogin = () => {
    if (!username || !password) {
      alert("Error: Username and password cannot be empty!");
      return; // Prevent login
    }
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  // Search handler
  const handleSearch = () => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bug Hunt Adventure App</h1>

      {/* Login Form */}
      {!isLoggedIn ? (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Login</h2>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="my-2"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="my-2"
            />
            <Button onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Welcome, {username || "User"}!</h2>

          <div className="space-y-4">
            {/* Search Section */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold">Search Products</h3>
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="my-2"
                />
                <ul className="list-disc pl-5">
                  {handleSearch().map((product) => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Product List */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold">Products</h3>
                <ul className="list-disc pl-5">
                  {products.map((product) => (
                    <li key={product.id} className="flex justify-between">
                      {product.name}
                      <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Cart Section */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {cart.map((item) => (
                      <li key={item.id}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
