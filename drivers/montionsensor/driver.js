"use strict";

const Homey = require("homey");

class DriverMotionSensor extends Homey.Driver {
  onPairListDevices(data, callback) {
    this.log("onPairListDevices from DriverMotionSensor");
    callback(null, [
      {
        name: "Motion Sensor",
        data: {
          id: "1.48"
        }
      }
    ]);
  }
}

module.exports = DriverMotionSensor;
