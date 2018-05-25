'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let PostData = fs.readFileSync('post.csv','utf8').split('\n')
    let postArray = []

    PostData.forEach(element => {
      element = element.split(',')
      let newObj = {
        UserId:+element[0],
        content:element[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      postArray.push(newObj)
    });

    return queryInterface.bulkInsert('Posts', postArray , {});
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
