const express = require("express");
const router = express.Router();
const main = require("../app/controllers/main");
const YAML = require("yamljs");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

// routes file
const categoryRouter = require("./categoryRouter");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const wishlistRouter = require("./wishlistRouter");
const transactionRouter = require("./transactionRouter");
const notifRouter = require("./notifRouter");

/* ========= Main Routes ========= */
// router.use("/", testRouter);
router.use("/api/category", categoryRouter);
router.use("/api", userRouter);
router.use("/api/product", productRouter);
router.use("/api/wishlist", wishlistRouter);
router.use("/api/transaction", transactionRouter);
router.use("/api/notif", notifRouter);

/* ========= Open API Routes ========= */
// show open api format .json
router.get("/api/docs", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// show open api with Swagger UI
router.use(
  "/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

router.use(main.onLost);
router.use(main.onError);

module.exports = router;
