'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Product ,{
        through: "Product_Transaction",
        as: "products",
        foreignKey: "productId",
      });
      this.belongsTo(models.User, {
        through: "Product_Transaction",
        as: "userAsBuyer",
        foreignKey: "userId",
      });
    }
  }
  Transaction.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    bidPrice: DataTypes.STRING,
    status: {
        type: DataTypes.STRING,
        values: ["pending", "success", "cancel"],
        defaultValue: "pending",
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};