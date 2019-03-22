"use strict";

const Homey = require("homey");
const SmartBus = require("smart-bus");

class DriverMotionSensor extends Homey.Driver {
  onPairListDevices(data, callback) {
    this.log("onPairListDevices from DriverMotionSensor");
    const bus = new SmartBus("hdl://10.24.24.12:6000");
    const devices = [];
    bus.on("command", function(command) {
      if (command.sender.type == 328) {
        devices.push({
          name: `SensorInOne ${command.sender.id}`,
          data: {
            id: `1.${command.sender.id}`
          }
        });
      }
		});

    bus.send("255.255", 0x000e, function(err) {
      if (err) {
        this.log(err);
      }
		});

    setTimeout(() => {
			callback(null, devices);
		}, 2000);
  }
}

module.exports = DriverMotionSensor;
