'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    let UserData = fs.readFileSync('users.csv','utf8').split('\n')
    let userArray = []

    UserData.forEach(element => {
      element = element.split(',')
      let newObj = {
        email:element[0],
        username:element[1],
        password:element[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      userArray.push(newObj)
    });

    return queryInterface.bulkInsert('Users', userArray , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
