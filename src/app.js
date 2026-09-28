const cors = require("cors");
const express = require("express");
const adminRoutes = require("./Route/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "E-commerce API running" });
});

app.use("/api/admin", adminRoutes);

module.exports = app;
