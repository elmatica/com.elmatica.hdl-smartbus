"use strict";

const Homey = require("homey");
const SmartBus = require("smart-bus");

class MyApp extends Homey.App {
  onInit() {
    this.log("MyApp is running...");
    const ip = Homey.ManagerSettings.get("ip_address");
    this._bus = new SmartBus(`hdl://${ip}:6000`);
  }

  bus() {
    return this._bus;
  }
}

module.exports = MyApp;
