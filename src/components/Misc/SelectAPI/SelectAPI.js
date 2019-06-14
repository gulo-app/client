import React, {Component} from 'react';
import './style.scss';
import {API_CALL} from '../../../consts';
import _ from 'lodash';

class SelectAPI extends Component{
  constructor(props){
    super(props);
    this.state = {data: []};

    this.fetchAPI = this.fetchAPI.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }
  componentDidMount(){
    this.fetchAPI();
  }
  fetchAPI(){
    let {api} = this.props;
    if(!api) return false;
    API_CALL(api.verb, api.url).then((data) => {
      this.setState({data});
    }).catch((e) => {
      setTimeout(this.fetchAPI, 1000);
    });
  }
  renderOptions(){
    let Options = _.map(this.state.data, (opt) => {
      return <option key={opt.id} value={opt.id}>{opt.name}</option>
    })
    return Options;
  }
  render(){
    let {value, name} = this.props;
    return(
      <select className={`SelectAPI ${!value && 'disabled'}`} value={value} name={name}
              onChange={this.props.onChange} required={this.props.required}>
        <option value="" disabled>{this.props.placeholder}</option>;
        {this.renderOptions()}
      </select>
    );
  }
}

export default SelectAPI;
