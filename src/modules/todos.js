import * as todoAPI from "../api/todos";
import {
    createPromiseThunk,
    createPromiseThunkById,
    handleAsyncActions,
    handleAsyncActionsById,
    handleAsyncCreateActions,
    reducerUtils
} from "../libs/asyncUtils";
/**
 * 이 모듈은 서브 리듀서이다. 루트 리듀서(modules/index.js)에 등록해서 사용.
 */

/**********************************************
    모든 액션을 미리 선언해둔다.
 **********************************************/
// TODO 생성
 const CREATE_TODO = 'CREATE_TODO';
 const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
 const CREATE_TODO_ERROR = 'CREATE_TODO_ERROR';

// TODOList 조회
const GET_TODOS = 'GET_TODOS';
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
const GET_TODOS_ERROR = 'GET_TODOS_ERROR';

// TODO 조회
const GET_TODO = 'GET_TODO';
const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS';
const GET_TODO_ERROR = 'GET_TODO_ERROR';

// TODO 업데이트
const UPDATE_TODO = 'UPDATE_TODO';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR';

// TODO 삭제
const DELETE_TODO = 'DELETE_TODO';
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR';

/**********************************************
    redux-thunk 함수

    Thunk 함수를 이용해서 아주 쉽게 만들 수 있다. 각 Promise마다 Thunk를 만들어줘야 함!
 **********************************************/
export const createTodo = createPromiseThunk(CREATE_TODO, todoAPI.createTodo);
export const getTodos = createPromiseThunk(GET_TODOS, todoAPI.getTodos);
export const getTodo = createPromiseThunkById(GET_TODO, todoAPI.getTodoById);
export const updateTodo = createPromiseThunkById(UPDATE_TODO, todoAPI.updateTodoById);
export const deleteTodo = createPromiseThunkById(DELETE_TODO, todoAPI.deleteTodoById);
export const goHome = (navigate) => (dispatch, getState) => {
    console.log("go home!")
    navigate("/");
}
export const goLogin = (navigate) => (dispatch, getState) => {
    // history.push("/login");
    navigate("/login");
}

const initialState = {
    todos: reducerUtils.initial(),
    todo: {}
}

/**********************************************
    Todo의 Reducer (index.js에 등록)

    dispatch를 할 때 해당 action의 type이 해당 함수에 걸리면 실행!
 **********************************************/
// 리듀서 역할 (리듀서는 export default로 내보내준다.)
export default function todos(state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO:
        case CREATE_TODO_SUCCESS:
        case CREATE_TODO_ERROR:
            return handleAsyncCreateActions(CREATE_TODO, 'todos')(state, action);
        case GET_TODOS:
        case GET_TODOS_SUCCESS:
        case GET_TODOS_ERROR:
            return handleAsyncActions(GET_TODOS, 'todos', false)(state, action);
        case GET_TODO:
        case GET_TODO_SUCCESS:
        case GET_TODO_ERROR:
            return handleAsyncActionsById(GET_TODO, 'todo', true)(state, action);
            /**
             * 아래 함수를 축약한 것과 같다.
             *  const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
             *  return postsReducer(state, action);
             */

        case UPDATE_TODO:
        case UPDATE_TODO_SUCCESS:
        case UPDATE_TODO_ERROR:
            return handleAsyncActionsById(UPDATE_TODO, 'todos')(state, action);
            // return handleAsyncActionsUpdateById(UPDATE_TODO, 'todos')(state, action);
        case DELETE_TODO:
        case DELETE_TODO_SUCCESS:
        case DELETE_TODO_ERROR:
            return handleAsyncActionsById(DELETE_TODO, 'todos')(state, action);
            // return handleAsyncActionsDeleteById(DELETE_TODO, 'todos')(state, action);
        default:
            return state;
    }
}