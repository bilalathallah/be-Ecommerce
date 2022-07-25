const express = require("express");
const router = express.Router();
const main = require("../app/controllers/api/v1/main");
const YAML = require("yamljs");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");
const apiDocumentation = require('../secondhand-api.json');

const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const wishlistRouter = require("./wishlistRouter");
const transactionRouter = require("./transactionRouter");
const notifRouter = require("./notifRouter");

router.use("/api/v1", userRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/wishlist", wishlistRouter);
router.use("/api/v1/transaction", transactionRouter);
router.use("/api/v1/notification", notifRouter);

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
