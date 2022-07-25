'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const categoryA = [
      {
        name: "Hobi",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryB = [
      {
        name: "Kendaraan",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryC = [
      {
        name: "Baju",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryD = [
      {
        name: "Elektronik",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];
    const categoryE = [
      {
        name: "Kesehatan",
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    await queryInterface.bulkInsert("Categories", categoryA, {});
    await queryInterface.bulkInsert("Categories", categoryB, {});
    await queryInterface.bulkInsert("Categories", categoryC, {});
    await queryInterface.bulkInsert("Categories", categoryD, {});
    await queryInterface.bulkInsert("Categories", categoryE, {});
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
