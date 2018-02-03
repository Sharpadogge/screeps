var harvester = require('role.harvester');

module.exports.loop = function () {
  harvester.create(2);
  harvester.runAll();
}
