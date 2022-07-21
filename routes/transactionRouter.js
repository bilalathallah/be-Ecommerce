const express = require("express");
const router = express.Router();
const transactionController = require("../app/controllers/transactionController");
const transactionMiddleware = require("../middlewares/transactionMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

router.get(
  "/",
  userMiddleware.authorize, 
  transactionController.list
);
router.get(
  "/buyer",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  transactionController.listByBuyer,
);
router.get(
  "/seller",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  transactionController.listBySeller,
);
router.get(
  "/buyer/:id",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  transactionController.showByBuyer,
);
router.get(
  "/seller/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  transactionController.showBySeller,
);
router.post(
  "/",
  userMiddleware.authorize,
  userMiddleware.isBuyyer,
  userMiddleware.validateUserIdentity,
  transactionMiddleware.getProductByUser,
  transactionController.create
);
router.put(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  transactionController.update
);
router.delete(
  "/:id",
  userMiddleware.authorize,
  userMiddleware.isSeller,
  transactionController.destroy
);

module.exports = router;