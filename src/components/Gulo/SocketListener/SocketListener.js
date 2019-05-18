import {Component} from 'react';
import io                                           from 'socket.io-client';
import {connect}                                    from 'react-redux';
import {insertList, updateList, deleteList}         from '../../../actions/list';
import {updateListProduct}                          from '../../../actions/list/product';
import {subscribeSocket}                            from '../../../actions/socket';
import {insertNotification}                         from '../../../actions/notification';
import {URI}                                        from '../../../consts'

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
      socket.on('listUpdated', (updatedList) => this.props.updateList(updatedList));
      socket.on('listDeleted', (list_id) => this.props.deleteList(list_id));
      socket.on('updateListProduct', (listProduct) => this.props.updateListProduct(listProduct));

      socket.on('newNotification', (newNotification) => this.props.insertNotification(newNotification));
    });
  }

  render(){return null}
}

const mapStateToProps = ({user, socket}) => {return {user, socket} };

export default connect(mapStateToProps, {subscribeSocket, insertList, updateListProduct, updateList, deleteList, insertNotification})(SocketListener);
