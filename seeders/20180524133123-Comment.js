'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    let CommentData = fs.readFileSync('comments.csv','utf8').split('\n')
    let commentArray = []
    CommentData.splice(CommentData.length-1,1)
    CommentData.forEach(element => {
      element = element.split(',')
      let newObj = {
        PostId: +element[0],
        UserId: +element[1],
        content:element[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      console.log('-----',commentArray)
    });

    return queryInterface.bulkInsert('Comments', commentArray , {});
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
