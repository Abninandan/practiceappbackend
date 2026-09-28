const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserRole } = require("../Model/Mongodb");

const login = async (req, res) => {
	const { email, password } = req.body ?? {};
	if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
		return res.status(400).json({ message: "Email and password are required" });
	}

	if (!process.env.JWT_SECRET) {
		return res.status(500).json({ message: "Authentication is not configured" });
	}

	const user = await User.findOne({ email: email.trim().toLowerCase() });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	const assignments = await UserRole.find({ userId: user._id }).populate("roleId", "name");
	const isAdmin = assignments.some(
		({ roleId }) => roleId?.name?.toLowerCase() === "admin"
	);
	if (!isAdmin) {
		return res.status(403).json({ message: "Administrator access required" });
	}

	const token = jwt.sign(
		{ sub: user._id.toString(), email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);

	return res.json({
		message: "Login successful",
		token,
		user: { id: user._id, name: user.name, email: user.email },
	});
};

const dashboard = (req, res) => {
	res.json({
		message: "Admin dashboard",
		user: { id: req.user.sub, email: req.user.email },
	});
};

module.exports = { login, dashboard };