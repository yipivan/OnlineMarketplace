'use strict';
const faker = require('faker');
const models = require("./../models");
const Product = models.Product;
const data = require('./../productdata').lvs;
// const brands = ["Nike","Boss","Rainbow","Meow"];
var conditions = ["new", "used"];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [];
    for (let i = 0; i < 5; i++) {
      products.push({
        title: data[i].name,
        description: faker.lorem.lines(),
        // size: Math.floor(Math.random() * 6) + 4,
        color: faker.commerce.color(),
        condition: conditions[Math.floor(Math.random() * 2)],
        curentBidPrice: faker.commerce.price(),
        currentAskPrice: faker.commerce.price(),
        quantity: Math.floor(Math.random() * 10) + 5,
        sellerId: 1,
        // buyerId: Math.floor(Math.random() * 3) + 4,
        categoryId: Math.floor(Math.random() * 3) + 1,
        brand: "Louis Vuitton",
        // photos: [data[i].link]
      });
    }
    return Product.bulkCreate(products);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
