import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader'

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
