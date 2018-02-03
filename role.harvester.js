const C = require('constants');

var HarvesterService = {
    create: function (max) {
        if (typeof max !== "number") max = 10;
        if(harvesters.length < max) {
            Game.rooms['Main'].createCreep([WORK, CARRY, WALK], "Harvester-"+(new Date().getTime()), {
                role: C.ROLE_HARVESTER
            });
        }
    },
    getAll: function () {
        return _.filter(Game.creeps, (creep) => creep.memory.role == C.ROLE_HARVESTER);
    },
    runAll: function () {
        for (var name in _.filter(Game.creeps, (creep) => creep.memory.role == C.ROLE_HARVESTER)) {
            var creep = Game.creeps[name];
            job.run(creep);
        }
    }
}

var job = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                                structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = HarvesterService;
