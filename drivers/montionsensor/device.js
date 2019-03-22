'use strict';
const SmartBus = require('smart-bus');
const Homey = require('homey');


class DeviceMotionSensor extends Homey.Device {

	onInit() {
		this.log('Device init');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());

		// register a capability listener
		// this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
		this.startListening()
	}

	// this method is called when the Device has requested a state change (turned on or off)
	startListening () {
		this._bus = new SmartBus('hdl://1.52@10.24.24.12:6000');
		this._motionSensor = this._bus.device('1.48');
		this._motionSensor.on(49, (data, target) =>{
			this.log(data)
			if (data.level == 100) {
				this.setCapabilityValue('alarm_motion', true)
			} else {
				this.setCapabilityValue('alarm_motion', false)
			}
		 });
	}

}

module.exports = DeviceMotionSensor;
