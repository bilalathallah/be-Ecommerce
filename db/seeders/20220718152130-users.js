'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const pass = "password";
    const password = bcrypt.hashSync(pass, 10);
    const timestamp = new Date();

    const sellerA = [
      {
        role: "SELLER",
        name: "SELLER A",
        email: "seller1@secondhand.com",
        password,
        city: "Jakarta",
        address: "Jl. Jakarta",
        phone: "62781929392398",
        image:
          "https://ui-avatars.com/api/?name=Seller+A&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const sellerB = [
      {
        role: "SELLER",
        name: "SELLER B",
        email: "seller2@secondhand.com",
        password,
        city: "Bandung",
        address: "Jl. Sunda",
        phone: "6212356790",
        image:
          "https://ui-avatars.com/api/?name=Seller+B&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const sellerC = [
      {
        role: "SELLER",
        name: "SELLER C",
        email: "seller3@secondhand.com",
        password,
        city: "Aceh",
        address: "Jl. Aceh",
        phone: "62723409812",
        image:
          "https://ui-avatars.com/api/?name=Seller+C&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerA = [
      {
        role: "BUYER",
        name: "BUYER A",
        email: "buyer1@secondhand.com",
        password,
        city: "Bekasi",
        address: "Jl. Bekasi",
        phone: "62342342321",
        image:
          "https://ui-avatars.com/api/?name=Buyer+A&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerB = [
      {
        role: "BUYER",
        name: "BUYER B",
        email: "buyer2@secondhand.com",
        password,
        city: "Tangerang",
        address: "Jl. Tangerang",
        phone: "62394999212",
        image:
          "https://ui-avatars.com/api/?name=Buyer+B&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    const buyerC = [
      {
        role: "BUYER",
        name: "BUYER C",
        email: "buyer3@secondhand.com",
        password,
        city: "Malang",
        address: "Jl. Malang",
        phone: "6234812390",
        image:
          "https://ui-avatars.com/api/?name=Buyer+C&background=4e73df&color=ffffff&size=100",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Users", sellerA, {});
    await queryInterface.bulkInsert("Users", sellerB, {});
    await queryInterface.bulkInsert("Users", sellerC, {});
    await queryInterface.bulkInsert("Users", buyerA, {});
    await queryInterface.bulkInsert("Users", buyerB, {});
    await queryInterface.bulkInsert("Users", buyerC, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
