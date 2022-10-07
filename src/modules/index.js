// Root Reducer
import {combineReducers} from "redux";
import todos from "./todos";
import accounts from "./accounts";

const rootReducer = combineReducers({todos, accounts});

export default rootReducer;