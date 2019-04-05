import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {API_CALL} from '../../../consts';

class RadiosAPI extends Component{
  constructor(props){
    super(props);
    this.state = {options: []};

    this.fetchAPI = this.fetchAPI.bind(this);
  }
  componentDidMount(){
    this.fetchAPI();
  }
  fetchAPI(){
    let {api} = this.props;
    if(!api) return false;
    API_CALL(api.verb, api.url).then((options) => {
      this.setState({options});
    }).catch((e) => {
      setTimeout(this.fetchAPI, 1000);
    });
  }
  renderRadios(){
    let {name, value} = this.props;
    let {options} = this.state;
    let radios = _.map(options, (option) => {
      let bg = {backgroundColor: option.id===value ? option.color : ''};
      let onClick = this.props.readOnly ? null : () => this.props.onClick({target: {name, value: option.id}});
      return <div key={option.id} style={bg} onClick={onClick}>{option.name}</div>
    })
    return radios;
  }
  render(){
    return (
      <div className='RadioTypes'>
        {this.renderRadios()}
      </div>
    );
  }
}

export default RadiosAPI;
