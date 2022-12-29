import * as constants from '../constants';



export const setTask = userTask  => {
    return{
        type: constants.SET_TASK,
        payload: {userTask},
    }

};

export const removeTask = userTask  => {
    return{
        type: constants.REMOVE_TASK,
        payload: {userTask},
    }

};

// export const removeTask = key  => {
//     return{
//         type: constants.REMOVE_TASK,
//         payload: {key},
//     }

// };


