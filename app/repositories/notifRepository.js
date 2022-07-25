const { Notification, Transaction, Product, Category } = require("../../database/models");

module.exports = {
  findAll() {
    return Notification.findAll();
  },

  findByBuyer(id) {
    try {
      const data = Notification.findAll({
        include: [
          {
            model: Transaction,
            as: "transactions",
            include: [
              {
                    model: Product,
                    as: "products",
                    attributes: [
                      "name",
                      "image",
                      "price",
                    ],
                    include: [
                      {
                        model: Category,
                        as: "categories",
                        attributes: ["name"]
                      },
                ],
                attributes: ["productId"]
              },
            ],
            where: {
              userId: id,
            },
            attributes: ["Bidprice"]
          },
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  findBySeller(id) {
    try {
      const data = Notification.findAll({
        where: { 
            userId: id 
        },
        include: [
          {
            model: Transaction,
            as: "transactions",
            include: [
              {
                    model: Product,
                    as: "products",
                    attributes: [
                      "name",
                      "image",
                      "price",
                    ],
                    include: [
                      {
                        model: Category,
                        as: "categories",
                        attributes: ["name"],
                      },
                    ],
                attributes: ["productId"]
              },
            ],
            attributes: ["Bidprice"],
          },
        ],
      });

      if (data) {
        return data;
      }
    } catch (error) {
      return error;
    }
  },

  find(id) {
    return Notification.findOne({
      where: {
        id: id,
      },
    });
  },

  create(createArgs) {
    return Notification.create(createArgs);
  },

  update(id, updateArgs) {
    return Notification.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  updateAllBuyer() {
    return Notification.update( 
      { isReadBuyer: true }, 
      { 
        where: { 
          isReadBuyer: false 
        }, 
    });
  },

  updateAllSeller() {
    return Notification.update(
      { isReadSeller: true }, 
      { 
        where: { 
          isReadSeller: false 
        },
    });
  },

  delete(id) {
    return Notification.destroy({
      where: {
        id,
      },
    });
  },
};