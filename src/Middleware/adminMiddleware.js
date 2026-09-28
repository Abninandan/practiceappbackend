const authenticateToken = require("./authMiddleware");
const { UserRole } = require("../Model/Mongodb");

const requireAdmin = [
	authenticateToken,
	async (req, res, next) => {
		try {
			const assignments = await UserRole.find({ userId: req.user.sub }).populate("roleId", "name");
			const isAdmin = assignments.some(
				({ roleId }) => roleId?.name?.toLowerCase() === "admin"
			);

			if (!isAdmin) {
				return res.status(403).json({ message: "Administrator access required" });
			}

			return next();
		} catch (error) {
			return next(error);
		}
	},
];

module.exports = requireAdmin;