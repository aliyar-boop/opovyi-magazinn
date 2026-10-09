import React, { useState } from "react";

const initialFoods = [
  {
    id: 1,
    name: "Бургер",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 2,
    name: "Пицца",
    price: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  },
  {
    id: 3,
    name: "Фри",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
  },
];

function App() {
  const [foods, setFoods] = useState(initialFoods);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState("menu");

  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  // Себетке кошуу
  const addToCart = (food) => {
    const existing = cart.find((item) => item.id === food.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  // Себеттен өчүрүү
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Саны көбөйтүү
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Саны азайтуу
  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Жалпы сумма
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Заказ берүү
  const createOrder = () => {
    if (cart.length === 0) {
      alert("Себет бош!");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      totalPrice,
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    setOrders([...orders, order]);
    setCart([]);

    alert("Заказ ийгиликтүү берилди!");
    setPage("orders");
  };

  // Тамак кошуу
  const addFood = () => {
    if (!newFood.name || !newFood.price) {
      alert("Тамактын атын жана баасын жазыңыз");
      return;
    }

    const food = {
      id: Date.now(),
      name: newFood.name,
      price: Number(newFood.price),
      imageUrl:
        newFood.imageUrl ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
    };

    setFoods([...foods, food]);

    setNewFood({
      name: "",
      price: "",
      imageUrl: "",
    });

    alert("Тамак кошулду!");
  };

  // Тамак өчүрүү
  const deleteFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  // Заказды бүтүрүү
  const completeOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: "completed" }
          : order
      )
    );
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          🍔 Food Order
        </div>

        <nav>
          <button
            className={page === "menu" ? "active" : ""}
            onClick={() => setPage("menu")}
          >
            Меню
          </button>

          <button
            className={page === "orders" ? "active" : ""}
            onClick={() => setPage("orders")}
          >
            📦 Заказдар
          </button>

          <button
            className={page === "admin" ? "active" : ""}
            onClick={() => setPage("admin")}
          >
            ⚙️ Admin
          </button>

          <button
            className="cartButton"
            onClick={() => setPage("cart")}
          >
            🛒 Себет ({cart.length})
          </button>
        </nav>
      </header>

      {/* MENU */}
      {page === "menu" && (
        <main className="container">

          <section className="hero">
            <h1>Даамдуу тамактар</h1>
            <p>
              Каалаган тамагыңызды тандап, онлайн заказ бериңиз.
            </p>
          </section>

          <h2>🍔 Меню</h2>

          <div className="foodGrid">
            {foods.map((food) => (
              <div className="foodCard" key={food.id}>

                <img
                  src={food.imageUrl}
                  alt={food.name}
                />

                <div className="foodInfo">
                  <h3>{food.name}</h3>

                  <div className="foodBottom">
                    <strong>{food.price} сом</strong>

                    <button
                      onClick={() => addToCart(food)}
                    >
                      + Себетке
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      )}

      {/* CART */}
      {page === "cart" && (
        <main className="container">

          <h1>🛒 Себет</h1>

          {cart.length === 0 ? (
            <div className="empty">
              Себет азырынча бош.
            </div>
          ) : (
            <>
              <div className="cartList">

                {cart.map((item) => (
                  <div className="cartItem" key={item.id}>

                    <img
                      src={item.imageUrl}
                      alt={item.name}
                    />

                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.price} сом</p>
                    </div>

                    <div className="quantity">
                      <button onClick={() => decrease(item.id)}>
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increase(item.id)}>
                        +
                      </button>
                    </div>

                    <strong>
                      {item.price * item.quantity} сом
                    </strong>

                    <button
                      className="deleteBtn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>

                  </div>
                ))}

              </div>

              <div className="checkout">
                <h2>Жалпы: {totalPrice} сом</h2>

                <button
                  className="orderButton"
                  onClick={createOrder}
                >
                  Заказ берүү
                </button>
              </div>
            </>
          )}

        </main>
      )}

      {/* ORDERS */}
      {page === "orders" && (
        <main className="container">

          <h1>📦 Заказдар</h1>

          {orders.length === 0 ? (
            <div className="empty">
              Азырынча заказ жок.
            </div>
          ) : (
            <div className="ordersList">

              {orders.map((order) => (
                <div className="orderCard" key={order.id}>

                  <div className="orderHeader">
                    <h3>
                      Заказ #{order.id}
                    </h3>

                    <span
                      className={
                        order.status === "completed"
                          ? "completed"
                          : "pending"
                      }
                    >
                      {order.status}
                    </span>
                  </div>

                  <p>
                    Дата: {order.createdAt}
                  </p>

                  <div>
                    {order.items.map((item) => (
                      <p key={item.id}>
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  <h3>
                    Жалпы: {order.totalPrice} сом
                  </h3>

                  {order.status === "pending" && (
                    <button
                      onClick={() =>
                        completeOrder(order.id)
                      }
                    >
                      Заказды бүтүрүү
                    </button>
                  )}

                </div>
              ))}

            </div>
          )}

        </main>
      )}

      {/* ADMIN */}
      {page === "admin" && (
        <main className="container">

          <h1>⚙️ Admin Page</h1>

          <section className="adminForm">

            <h2>➕ Жаңы тамак кошуу</h2>

            <input
              type="text"
              placeholder="Тамактын аталышы"
              value={newFood.name}
              onChange={(e) =>
                setNewFood({
                  ...newFood,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Баасы"
              value={newFood.price}
              onChange={(e) =>
                setNewFood({
                  ...newFood,
                  price: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Сүрөт URL"
              value={newFood.imageUrl}
              onChange={(e) =>
                setNewFood({
                  ...newFood,
                  imageUrl: e.target.value,
                })
              }
            />

            <button onClick={addFood}>
              Тамак кошуу
            </button>

          </section>

          <h2>🍔 Тамактар</h2>

          <div className="adminFoods">

            {foods.map((food) => (
              <div className="adminFood" key={food.id}>

                <img
                  src={food.imageUrl}
                  alt={food.name}
                />

                <div>
                  <h3>{food.name}</h3>
                  <p>{food.price} сом</p>
                </div>

                <button
                  className="deleteBtn"
                  onClick={() => deleteFood(food.id)}
                >
                  🗑️ Өчүрүү
                </button>

              </div>
            ))}

          </div>

        </main>
      )}

      <footer>
        <div>© 2026 Food Order App</div>
        <div>Алиярдын проекти</div>
      </footer>

    </div>
  );
}

export default App;
