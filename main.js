require('prototype.spawn')();
var roleHarvester0 = require('role.harvester0');
var roleHarvester1 = require('role.harvester1');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMule = require('role.mule');
var roleWallRepairer = require('role.wallrepairer');
var roleMiner = require('role.miner');
var dispatcher = require('dispatcher');
var energytargets;

module.exports.loop = function () {
    //get a list of all the creeps in all the roles
    var harvesters0 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester0');
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var mules = _.filter(Game.creeps, (creep) => creep.memory.role == 'mule');
    var mules = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');

    //other variable declaration
    var logspawn = 0;
    var energyavailable = 0;
    var newname;

    dispatcher.run();
    console.log(energytargets);

    //clear memory of dead creeps
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }

    var tower = Game.getObjectById('58473f258b67cb962d963d62');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    //main loop for spawners
    for(var spawnname in Game.spawns) {
      var spawner = Game.spawns[spawnname];

      availablecontainers = spawner.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_CONTAINER);
                  }
      });

      energyavailable = spawner.room.energyAvailable;

      //code to create harvesters based on available energy and number of harvesters
      if(harvesters0.length < 2){
        newName = spawner.spawnBalancedCreep(energyavailable, 'harvester0');
        if(newName){
          console.log('Spawning new harvester0: ' + newName);
          break;
        }
      }
      if(harvesters1.length < 2){
        newName = spawner.spawnBalancedCreep(energyavailable, 'harvester1');
        if(newName){
          console.log('Spawning new harvester1: ' + newName);
          break;
        }
      }

      //code to create builders based on available energy
      if(builders.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, 'builder');
        if(newName){
          console.log('Spawning new builder: ' + newName);
          break;
        }
      }

      //code to create upgraders based on available energy
      if(upgraders.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, 'upgrader');
        if(newName){
          console.log('Spawning new upgrader: ' + newName);
          break;
        }
      }

      //code to create repairers based on available energy
      if(repairers.length < 1){
        newName = spawner.spawnBalancedCreep(energyavailable, 'repairer');
        if(newName){
          console.log('Spawning new repairer: ' + newName);
          break;
        }
      }

      //code to create mules based on available energy
      if(mules.length < 2 && availablecontainers.length > 0){
        newName = spawner.spawnMuleCreep(energyavailable);
        if(newName){
          console.log('Spawning new mover: ' + newName);
          break;
        }
      }

      //code to create miners based on available energy
      /*if(miners.length < (creep.room.find(FIND_SOURCES)).length && availablecontainers.length > 0){
        newName = spawner.createbalCreep(energyavailable);
        if(newName){
          console.log('Spawning new miner: ' + newName);
          break;
        }
      }*/

      //code to create repairers based on available energy
      if(wallrepairers.length < 1){
        newName = spawner.createBalancedCreep(energyavailable, 'wallrepairer');
        if(newName){
          console.log('Spawning new wallrepairer: ' + newName);
          break;
        }
      }
    }

    //main loop for creeps: based on role jump to the role module associated with that role
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester0') {
            roleHarvester0.run(creep);
        }
        if(creep.memory.role == 'harvester1') {
            roleHarvester1.run(creep);
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
        if(creep.memory.role == 'mule'){
            roleMule.run(creep);
        }
        if(creep.memory.role == 'wallrepairer') {
            roleWallRepairer.run(creep);
        }
    }
}
