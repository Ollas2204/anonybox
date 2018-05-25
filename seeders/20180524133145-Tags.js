'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    let TagData = fs.readFileSync('tags.csv','utf8').split('\n')
    let tagArray = []

    TagData.forEach(element => {
      element = element.split(',')
      let newObj = {
        name:element[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      tagArray.push(newObj)
    });

    return queryInterface.bulkInsert('Tags', tagArray , {});
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
