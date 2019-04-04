import {Component} from 'react';
import io                               from 'socket.io-client';
import {connect}                        from 'react-redux';
import {insertList}         from '../../../actions/list';
import {updateListProduct}              from '../../../actions/list/product';
import {subscribeSocket}                from '../../../actions/socket';
import {URI}                            from '../../../consts'

class SocketListener extends Component{
  constructor(props){
    super(props);
    this.listen = this.listen.bind(this);
  }
  componentDidMount(){
    this.listen();
  }
  componentDidUpdate(prevProps){
    if(!prevProps.user && this.props.user)
      this.listen();
  }
  listen(){
    if(!this.props.user) return false;
    let {subscribeSocket} = this.props;
    const socket = io(URI);

    socket.on('connect', () => {
      subscribeSocket(socket, this.props.user);

      socket.on('newList', (newList) => this.props.insertList(newList));
      socket.on('updateListProduct', (listProduct) => this.props.updateListProduct(listProduct));
    });
  }

  render(){return null}
}

const mapStateToProps = ({user, socket}) => {return {user, socket} };

export default connect(mapStateToProps, {subscribeSocket, insertList, updateListProduct})(SocketListener);
