import { combineReducers } from 'redux';
import userReducer    from './user_reducer';
import listsReducer   from './lists_reducer';
import isMenuReducer  from './isMenu_reducer';
import socketReducer  from './socket_reducer';

const rootReducer = combineReducers({
    user:   userReducer,
    lists:  listsReducer,
    isMenu: isMenuReducer,
    socket: socketReducer
});

export default rootReducer;
