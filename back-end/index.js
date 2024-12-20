const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 4000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bat_thugs",
  database: "e_commerse",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Get routes
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
    } else {
      res.json(results);
    }
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).send("Error fetching products");
    } else {
      res.json(results);
    }
  });
});

app.get("/orders", (req, res) => {
  const query = "SELECT * FROM Orders";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      res.status(500).send("Error fetching orders");
    } else {
      res.json(results);
    }
  });
});

app.get("/reviews", (req, res) => {
  const query = "SELECT * FROM Reviews";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Error fetching reviews");
    } else {
      res.json(results);
    }
  });
});

// Create routes
app.post("/createUsers", (req, res) => {
  const { name, email, password } = req.body;
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ id: result.insertId, name, email });
    }
  });
});

app.post("/createProducts", (req, res) => {
  const { product_name, description, price, stock } = req.body;
  const query =
    "INSERT INTO products (product_name, description, price, stock) VALUES (?, ?, ?, ?)";
  db.query(query, [product_name, description, price, stock], (err, result) => {
    if (err) {
      console.error("Error creating product:", err);
      res.status(500).send("Error creating product");
    } else {
      res.status(201).json({ id: result.insertId, product_name, description });
    }
  });
});

app.post("/createOrders", (req, res) => {
  const { user_id, total_amount, status } = req.body;
  const order_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query =
    "INSERT INTO Orders (user_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [user_id, order_date, total_amount, status],
    (err, result) => {
      if (err) {
        console.error("Error creating order:", err);
        res.status(500).send("Error creating order");
      } else {
        res.status(201).json({
          id: result.insertId,
          user_id,
          total_amount,
          status,
          order_date,
        });
      }
    }
  );
});

app.post("/createReviews", (req, res) => {
  const { user_id, product_id, rating, review_text } = req.body;
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

  // First, check if the product exists
  const checkProductQuery = "SELECT * FROM products WHERE product_id = ?";

  db.query(checkProductQuery, [product_id], (checkErr, products) => {
    if (checkErr) {
      console.error("Error checking product:", checkErr);
      return res.status(500).send("Error checking product");
    }

    // If no product found
    if (products.length === 0) {
      return res.status(400).json({
        error: "Invalid Product",
        message: `Product with ID ${product_id} does not exist`,
      });
    }

    // If product exists, proceed with review insertion
    const query =
      "INSERT INTO Reviews (user_id, product_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, ?)";

    db.query(
      query,
      [user_id, product_id, rating, review_text, created_at],
      (err, result) => {
        if (err) {
          console.error("Error creating review:", err);
          return res.status(500).send("Error creating review");
        }

        res.status(201).json({
          id: result.insertId,
          user_id,
          product_id,
          rating,
          review_text,
          created_at,
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
