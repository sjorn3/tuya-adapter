'use strict';

const {_Adapter, _Database, _Device, Property} = require('gateway-addon');

class NumberProperty extends Property {
  constructor(device, dps) {
    super(device, dps, {
      label: dps,
      type: 'number',
      value: 0,
    });
    this.device = device;
    this.dps = dps;
  }

  setValue(value) {
    return new Promise(((resolve, reject) => {
      super.setValue(value).then((updatedValue) => {
        this.device.tuyapi.set({dps: this.dps, set: value});
        this.device.notifyPropertyChanged(this);
        resolve(updatedValue);
      }).catch((err) => {
        reject(err);
      });
    }).bind(this));
  }
}

module.exports = NumberProperty;