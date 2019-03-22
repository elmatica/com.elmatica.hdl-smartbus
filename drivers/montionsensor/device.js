"use strict";
const SmartBus = require("smart-bus");
const Homey = require("homey");

class DeviceMotionSensor extends Homey.Device {
  onInit() {
    this.log("Device init");
    this.log("Name:", this.getName());
    this.log("Class:", this.getClass());
    this.log("Id:", this.getData().id);

    this.startListening();
  }

  startListening() {
    this._bus = new SmartBus("hdl://1.52@10.24.24.12:6000");
    const id = this.getData().id;
    this._motionSensor = this._bus.device(id);
    this._motionSensor.on(49, (data, target) => {
      this.log(data);
      if (data.level == 100) {
        this.setCapabilityValue("alarm_motion", true);
      } else {
        this.setCapabilityValue("alarm_motion", false);
      }
    });
  }
}

module.exports = DeviceMotionSensor;
