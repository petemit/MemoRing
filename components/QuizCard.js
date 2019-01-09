import { combineReducers } from "redux";

export default combineReducers({
    currentUser,
    users,
    questions,
    loadingBar: loadingBarReducer
});
