const express = require("express");
const { dashboard, login } = require("../Controller/AdminController");
const requireAdmin = require("../Middleware/adminMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/dashboard", requireAdmin, dashboard);

module.exports = router;