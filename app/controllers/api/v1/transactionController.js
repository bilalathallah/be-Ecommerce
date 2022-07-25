const transactionService = require("../../../services/transactionService");
const notifService = require("../../../services/notifService");

module.exports = {
  async list(req, res) {
    try {
      const data = await transactionService.list();
      res.status(200).json({
        status: true,
        message: "Show all data transaction successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listByBuyer(req, res) {
    try {
      const data = await transactionService.getAllByBuyer(req.user.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data transaction",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await transactionService.getAllBySeller(req.user.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find all data transaction",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async showByBuyer(req, res) {
    try {
      const data = await transactionService.getDetailByBuyer(req.userId, req.params.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find Data transaction",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await transactionService.getDetailBySeller(req.userId, req.params.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find data transaction",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const data = await transactionService.create({
        productId: req.body.productId,
        userId: req.user.id,
        bidprice: req.body.bidprice,
        status: 'pending'
      });
      const createNotif = await notifService.create({
        transactionId: data.id,
        isReadBuyer: false,
        isReadSeller: false,
        message: "You have new transaction",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const transactionCreated = await transactionService.get(data.id);
      res.status(201).json({
        status: true,
        message: "Transaction has been added!",
        data: transactionCreated,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      await transactionService.update(req.params.id, {
        status: req.body.status,
      });

      const updatedStatus = await transactionService.get(req.params.id);

      const updateNotif  = await notifService.create({
        transactionId: updatedStatus.id,
        isReadBuyer: false,
        isReadSeller: false,
        message: "Transaction has been " + updatedStatus.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({
        status: true,
        message: "Transaction has been updated!",
        data: updatedStatus,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};