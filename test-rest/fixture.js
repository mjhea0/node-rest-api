var faker = require('Faker');

// generate fixtures
var bigData = [];
for(i = 20; i >= 0; i--){
  bigData.push(faker.Helpers.userCard());
};

module.exports = bigData

