import * as accountApi from "../api/accounts"
import { createPromiseThunk, handleAsyncCreateActions, handleAsyncSignInActions, handleAuthenticateActions, reducerUtils } from "../libs/asyncUtils";

// SignIn
const SIGNIN = 'SIGNIN';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_ERROR = 'SIGNIN_ERROR';

// SignUp
const SIGNUP = 'SIGNUP';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_ERROR = 'SIGNUP_ERROR';

// authenticate
const AUTH = 'AUTH';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_ERROR = 'AUTH_ERROR';

export const signIn = createPromiseThunk(SIGNIN, accountApi.signIn);
export const authenticate = createPromiseThunk(AUTH, accountApi.authenticate);

const initialState = {
    accounts: reducerUtils.initial(),
    account: reducerUtils.initial()
}

/**********************************************
    Account의 Reducer (index.js에 등록)

    dispatch를 할 때 해당 action의 type이 아래 케이스에 걸리면 실행!
 **********************************************/
export default function accounts(state = initialState, action) {
    switch (action.type) {
        case SIGNIN:
        case SIGNIN_SUCCESS:
        case SIGNIN_ERROR:
            return handleAsyncSignInActions(SIGNIN, 'account')(state, action);
        case AUTH:
        case AUTH_SUCCESS:
        case AUTH_ERROR:
            return handleAuthenticateActions(AUTH, 'account')(state, action);
        default: 
            return state;
    }
}