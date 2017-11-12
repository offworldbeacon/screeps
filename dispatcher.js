var dispatcher = {

  /** @param {Creep} creep **/
  run: function() {
    //we will run the dispatcher on each room we own
    //(indicated by spawn presence)
    for (var name in Game.rooms){
      var room = Game.rooms[name];
      console.log(room);
      var spawn = room.find(FIND_MY_SPAWNS)
      console.log(spawn);
      energytargets = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
      });
    }
  }
};

var getConstructionSite = {
  function() {
    //get all the spawns that I control
    var spawns = Game.spawns;
    //we will run the dispatcher on each room we own
    //(indicated by spawn presence)
    for (i = 0; i < spawns.length; i++){
      var spawn = Game.spawns[spawn[i]];
      var room = spawn.pos.roomName;
      console.log(room);
      energytargets = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
        }
      });
    }
  }
};

module.exports = {dispatcher, getConstructionSite};
