import React, { Component } from 'react'
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Plugins}        from '@capacitor/core';


class BarcodeScanner extends Component {
  handleScan(data){
    console.log(data);
    alert(data);
  }
  handleError(err){
    console.error(err)
  }
  render(){
    return(
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
        />
    )
  }
}

export default BarcodeScanner;
