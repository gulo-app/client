import React, {Component} from 'react';
import './style.scss';
import {API_CALL} from '../../../consts';
import _ from 'lodash';

class DataListAPI extends Component{
  constructor(props){
    super(props);
    this.state = {data: [], isSelected: false};

    this.handleChange   =   this.handleChange.bind(this);
    this.fetchAPI       =   this.fetchAPI.bind(this);
    this.renderOptions  =   this.renderOptions.bind(this);
    this.optionSelected =   this.optionSelected.bind(this);
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
    let {value} = this.props;
    if(value.length < 2 || this.state.isSelected)
      return false;

    let Options = _.map(this.state.data, (opt) => {
      if(opt.name.includes(value))
        return  <div  className={`option ${(/^[a-zA-Z]+$/).test(opt.name) && 'english'}`} key={opt.id}
                      onClick={() => this.optionSelected(opt)}>
                  {opt.name}
                </div>
    })
    return Options;
  }
  optionSelected(opt){
    let e = {};
    e.target = {
      name:   this.props.name,
      value:  opt.name
    }
    this.setState({isSelected: true});
    this.props.onChange(e);
    this.props.onSelect(opt.id); //trigger onSelect only if dataList MATCH option
  }
  handleChange(e){
    this.setState({isSelected: false});
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
        <input type='text' name={name} value={value} onChange={this.handleChange} placeholder={placeholder} required />
        <div className='options'>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}

export default DataListAPI;
