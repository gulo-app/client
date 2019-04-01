import React, {Component} from 'react';
import './style.scss';
import _ from 'lodash';
import {connect} from 'react-redux';
import Icon from '../../Misc/Icon';
import MenuToggler  from '../../Misc/MenuToggler';


class ViewList extends Component{
  constructor(props){
    super(props);
    this.state = {list:null, products:[]}

    this.setList    =     this.setList.bind(this);
  }
  componentDidMount(){
    this.setList();
    this.fetchProducts();
  }
  componentDidUpdate(prevProps){
    if(prevProps.lists.length===0 && this.props.lists.length>0)
        this.setList();
  }
  setList(){
    let {lists} = this.props;
    if(lists.length===0) return false;
    let list_id = Number(this.props.match.params.list_id);
    let list = _.find(lists, {list_id});
    this.setState({list});
  }
  fecthProducts(){
    
  }

  render(){
    let {list} = this.state;
    if(!list) return null;

    return(
      <div className='Page ViewList'>
        <header>
          <div className='right'><MenuToggler /></div>
          <div className='title'>{list.list_name}</div>
          <div className='left'><Icon icon='search' size='2x' /></div>
        </header>
        <main className='lists'>

        </main>
        <footer>
          <button onClick={this.toggleIsNew}><Icon icon="plus" />רשימה חדשה </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = ({lists}) => {return {lists} };
export default connect(mapStateToProps)(ViewList);
