var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMover = require('role.mover');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var fullspawners = _.filter(Game.spawns, (spawn) => spawn.energy == spawn.energyCapacity);
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    var energyavailable;

    for(var spawners in fullspawners) {

      currentroom = spawners.room
      availablestructures = currentroom.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                          structure.energy < structure.energyCapacity;
                  }
      });

      for(var structure in availablestructures){
        energyavailable += structure.energy
      }
        if(harvesters.length < 3){
          if(energyavailable >= 550) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
          }
          if(energyavailable > 300 && energyavailable < 550) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
          }
          else{
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
          }
          console.log('Spawning new harvester: ' + newName);
          break;
      }

      if(builders.length < 3) {
          var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
          console.log('Spawning new builder: ' + newName);
          break;
      }

      if(upgraders.length < 3) {
          var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
          console.log('Spawning new upgrader: ' + newName);
          break;
      }

      if(repairers.length < 2){
          var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
          console.log('Spawning new repairer: ' + newName);
          break;
      }

      if(movers.length < 1){
          var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'mover'});
          console.log('Spawning new mover: ' + newName);
          break;
      }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'mover'){
            roleMover.run(creep);
        }
    }
}
