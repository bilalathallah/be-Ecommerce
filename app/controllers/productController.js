const productService = require("../services/productService");
const { promisify } = require("util");
const cloudinary = require("../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
  async list(req, res) {
    try {
      const data = await productService.list();
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await productService.listBySeller(req.user.id);
      console.log(data);
      res.status(200).json({
        status: true,
        message: "Show all data product successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const { name, price, categoryId, description, image, status } = req.body;
      const userTokenId = req.user.id;
      
      const productCreated = await productService.create({
        userId: userTokenId,
        name,
        price,
        categoryId,
        description,
        image,
        status,
      });
      const data = await productService.get(productCreated.id);
      res.status(200).json({
        status: true,
        message: "Product added",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const data = await productService.get(req.params.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await productService.getBySellerId(
        req.params.id,
        req.user.id
      );
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      await productService.update(req.params.id, req.body);
      const data = await productService.get(req.params.id);

      res.status(200).json({
        status: true,
        message: "Product has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      await productService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Product has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};
