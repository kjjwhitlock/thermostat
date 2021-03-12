'use strict';

describe ('Thermostat', function(){

  var thermostat;

  beforeEach(function() {
      thermostat = new Thermostat();
    });

it('starts at 20 degrees', function() {
  expect(thermostat.getCurrentTemperature()).toEqual(20);
});
it('turns the temperature up by 1', function() {
  thermostat.up();
  expect(thermostat.getCurrentTemperature()).toEqual(21);
});
it('turns the temperature down by 1', function() {
  thermostat.down();
  expect(thermostat.getCurrentTemperature()).toEqual(19);
});
it('has a minimum of 10 degrees', function() {
  for (var i = 0; i < 10; i++) {
    thermostat.down();
  }
  expect(thermostat.getCurrentTemperature()).toEqual(10);
});

it('cannot go below 10 degrees', function() {
  for (var i = 0; i < 10; i++) {
    thermostat.down();
  }
  expect(function() {thermostat.down()}).toThrow(new Error("You've gone far enough"))
});

it('has power saving mode on by default', function() {
  expect(thermostat.isPowerSavingModeOn()).toBe(true);
});
it('can switch power saving mode off', function(){
  thermostat.togglePowerSave();
  expect(thermostat.isPowerSavingModeOn()).toBe(false);
});
it('can switch PSM back on', function(){
  thermostat.togglePowerSave();
  thermostat.togglePowerSave();
  expect(thermostat.isPowerSavingModeOn()).toBe(true);
});
it('can reset the temperature to 20 degrees', function() {
  thermostat.up();
  thermostat.reset();
  expect(thermostat.temperature).toEqual(20);
});

describe('when power saving mode is on', function() {
  it('has a maximum temperature of 25 degrees', function() {
    for (var i = 20; i < 25; i++) {
    thermostat.up();
    }
    expect(thermostat.getCurrentTemperature()).toEqual(25);
  });
  it('throws an error message if attempts to go beyond 25 while in PSM', function () {
    for (var i = 20; i < 25; i++) {
      thermostat.up();
  };
  expect(function() { thermostat.up() }).toThrow(new Error("not going hotter than this"))
  });
});

describe('displaying usage levels', function() {
describe('when the temperature is below 18 degrees', function() {
  it('it is considered low-usage', function() {
    for (var i = 0; i < 3; i++) {
      thermostat.down();
    }
    expect(thermostat.energyUsage()).toEqual('low-usage');
  });
});

describe('when the temperature is between 18 and 25 degrees', function() {
  it('it is considered medium-usage', function() {
    expect(thermostat.energyUsage()).toEqual('medium-usage');
  });
});

describe('when the temperature is anything else', function() {
  it('it is considered high-usage', function() {
    thermostat.togglePowerSave();
    for (var i = 0; i < 6; i++) {
      thermostat.up();
    }
    expect(thermostat.energyUsage()).toEqual('high-usage');
  });
});
});
});
