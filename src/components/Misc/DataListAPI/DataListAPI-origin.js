import React, {Component} from 'react';
import './style.scss';
import {API_CALL} from '../../../consts';
import _ from 'lodash';

class DataListAPI extends Component{
  constructor(props){
    super(props);
    this.state = {data: []};

    this.handleChange   =   this.handleChange.bind(this);
    this.fetchAPI       =   this.fetchAPI.bind(this);
    this.renderOptions  =   this.renderOptions.bind(this);
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
      return <option key={opt.id} value={opt.name}>{opt.name}</option>
    })
    return Options;
  }
  handleChange(e){
    let {value} = e.target;
    this.props.onChange(e);
    let opt = _.find(this.state.data, {name: value});
    this.props.onSelect(opt ? opt.id : 0); //trigger onSelect only if dataList MATCH option
  }
  render(){
    let {value, name, placeholder} = this.props;
    let {data} = this.state;
    if(data.length===0) return null;
    return(
      <div className='DataListAPI'>
        <datalist id={name}>
          {this.renderOptions()}
        </datalist>
        <input list={name} name={name} value={value} onChange={this.handleChange} placeholder={placeholder} required />
      </div>
    );
  }
}

export default DataListAPI;
