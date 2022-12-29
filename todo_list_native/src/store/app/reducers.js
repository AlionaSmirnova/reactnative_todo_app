
import * as constants from '../constants';
import { removeTask } from './actions';

const defaultStore = {
    userTasks:[],
};

function userReducer(state = defaultStore, action)  {
    switch (action.type) {
        case constants.SET_TASK:
            return {...state,
                 userTasks:[...state.userTasks, action.payload.userTask ]
                };

                 case constants.REMOVE_TASK:
                    // return {userTasks: deleteTask(action.payload, state.userTasks)};
                    return {userTasks: deleteTask(action.payload.userTask, state.userTasks)};

                    default:
                    return state;
    }
};

const deleteTask = (item, userTasks) => {
    const todoIndex = userTasks.indexOf(item);
    userTasks.splice(todoIndex, 1);
    return  [...userTasks];
    };
export default userReducer;