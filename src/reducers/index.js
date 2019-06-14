import { combineReducers } from 'redux';
import userReducer            from './user_reducer';
import listsReducer           from './lists_reducer';
import notificationsReducer   from './notifications_reducer';
import isMenuReducer          from './isMenu_reducer';
import socketReducer          from './socket_reducer';
import firebaseReducer        from './firebase_reducer';

const rootReducer = combineReducers({
    user:           userReducer,
    lists:          listsReducer,
    notifications:  notificationsReducer,
    isMenu:         isMenuReducer,
    socket:         socketReducer,
    firebase:       firebaseReducer
});

export default rootReducer;
