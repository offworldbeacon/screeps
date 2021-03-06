var roleBuilder = require('role.builder');
var roleWallRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var wallfound = false;
    var target;
    var walls = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART));
      }
    });

    for(var percent = .00001; percent < 1;  percent = (percent + .00001) ){
      for(var i = 0; i < walls.length; i++){
        if(walls[i].hits < (walls[i].hitsMax * percent)){
          wallfound = true;
          target = walls[i];
          break;
        }
      }

      if(wallfound){
        break;
      }
    }

    if (creep.carry.energy === 0){
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (creep.room.energyAvailable > creep.room.energyCapacityAvailable * .50){
        if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
          creep.moveTo(spawn, {reusePath: 25});
        }
      }
    }
    else {
      if (creep.repair(target) == ERR_NOT_IN_RANGE){
        creep.moveTo(target, {reusePath: 25});
      }
    }
  }
};

module.exports = roleWallRepairer;
