'use strict';

class Thermostat {
  constructor(){
   this.MAXIMUM_TEMPERATURE = 25;
   this.MINIMUM_TEMPERATURE = 10;
   this.temperature = 20;
   this.powerSavingMode = true;
   this.powerSavingStatus = "on"
  }
  getCurrentTemperature(){
  return this.temperature;
 }
 up(){
   if (this.MAXIMUM_TEMPERATURE > this.temperature ){ this.temperature += 1;
   } else {throw new Error("not going hotter than this");}
 }
 down(){
   if (this.MINIMUM_TEMPERATURE < this.temperature ) {
     this.temperature -=1;
   }
   else {
     throw new Error("You've gone far enough");
   }
 }

 reset(){
   this.temperature = 20
 }

 isMinimumTemperature(){
   return this.temperature === this.MINIMUM_TEMPERATURE;
 }
 isPowerSavingModeOn(){
   return this.powerSavingMode === true;
 }
togglePowerSave(){
    this.powerSavingMode === true ? this.powerSavingMode = false : this.powerSavingMode = true;
    this.powerSavingMode === true ? this.MAXIMUM_TEMPERATURE = 25 : this.MAXIMUM_TEMPERATURE = 32;
  }
energyUsage(){
  if (this.temperature < 18) {
  return "low-usage"
} else if (this.temperature <= 25) {
  return "medium-usage"
} else {
  return "high-usage"
}
}
};
