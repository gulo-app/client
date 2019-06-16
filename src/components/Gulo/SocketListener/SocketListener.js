import {Component} from 'react';
import io                                                       from 'socket.io-client';
import {connect}                                                from 'react-redux';
import {insertList, updateList, deleteList}                     from '../../../actions/list';
import {updateListProduct, deleteListProduct}                   from '../../../actions/list/product';
import {updateListManualProduct, deleteListManualProduct}       from '../../../actions/list/manual_product';
import {subscribeSocket}                                        from '../../../actions/socket';
import {insertNotification, deleteNotification}                 from '../../../actions/notification';
import {updateFirebaseNotificationToken}                        from '../../../actions/notification';
import {URI}                                                    from '../../../consts'
import { Plugins }                                              from '@capacitor/core';

class SocketListener extends Component{
  constructor(props){
    super(props);

    this.pushNotifications =  Plugins.PushNotifications;
    this.device            =  Plugins.Device;
    this.listen = this.listen.bind(this);
  }
  componentDidMount(){
    this.listen();
  }
  componentDidUpdate(prevProps){
    if(!prevProps.user && this.props.user)
      this.listen();
  }
  async listen(){
    if(!this.props.user) return false;
    let {subscribeSocket} = this.props;
    const socket = io(URI);

    socket.on('connect', () => {
      subscribeSocket(socket, this.props.user);

      socket.on('newList', (newList) => this.props.insertList(newList));
      socket.on('listUpdated', (updatedList) => this.props.updateList(updatedList));
      socket.on('listDeleted', (list_id) => this.props.deleteList(list_id));
      socket.on('updateListProduct', (listProduct) => this.props.updateListProduct(listProduct));
      socket.on('deleteListProduct', (cb) => this.props.deleteListProduct(cb.list_id, cb.product_id));

      socket.on('updateListManualProduct', (listProduct) => this.props.updateListManualProduct(listProduct));
      socket.on('deleteListManualProduct', (cb) => this.props.deleteListManualProduct(cb.list_id, cb.product_id));

      socket.on('newNotification',    (newNotification) => this.props.insertNotification(newNotification));
      socket.on('updateNotification', (notification)    => this.props.insertNotification(notification)); //in reducer: update&insert functionallity is the same.
      socket.on('deleteNotification', (notification_id) => this.props.deleteNotification(notification_id));
    });

    let deviceInfo = await this.device.getInfo();
    if(deviceInfo.platform==='android' || deviceInfo.platform==='ios'){
      this.pushNotifications.register();
      this.pushNotifications.addListener('registration', (token) => {
        this.props.updateFirebaseNotificationToken(token.value);
      })
    }

  }

  render(){return null}
}

const mapStateToProps = ({user, socket}) => {return {user, socket} };

export default connect(mapStateToProps, {subscribeSocket, insertList, updateListProduct, deleteListProduct, updateList, deleteList, insertNotification, deleteNotification, updateListManualProduct, deleteListManualProduct, updateFirebaseNotificationToken})(SocketListener);
