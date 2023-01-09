const Router = require("express");
const { check } = require("express-validator");
const controller = require("../controllers/authController");
const authMiddleWare = require("../middlware/authMiddleware");
const roleMiddleware = require("../middlware/roleMiddleware");
const router = new Router();

router.post(
	"/registration",
	[
		check("email", "field email must not be empty").notEmpty(),
		check("email", "Need a email format").isEmail(),
		check("password", "must be between 4 and 10 characters").isLength({
			min: 4,
			max: 10,
		}),
	],
	controller.registration
);
router.post("/login", controller.login);
router.post("/logout");
router.post("/activate/:link");
router.post("/refresh");
router.get("/users", roleMiddleware(["user"]), controller.getUsers);
router.get("/user/:id", controller.getUsersById);

module.exports = router;
