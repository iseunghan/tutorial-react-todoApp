import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goHome } from "../modules/todos";

/**********************************************
 Promise에 기반한 Thunk를 생성해주는 함수
 **********************************************/
export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
    // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
    // 예: writeComment({ postId: 1, text: '댓글 내용' });
    return param => async dispatch => {
        // 요청 시작
        dispatch({type, param});
        try {
            // 결과물의 이름을 payload라는 이름으로 통일!
            const payload = await promiseCreator(param);
            dispatch({type: SUCCESS, payload})  // success
        } catch (e) {
            dispatch({type: ERROR, payload: e, error: true});   // fail
        }
    };
};

/**********************************************
 리듀서에서 사용 할 수 있는 여러 유틸 함수들입니다.
 **********************************************/
export const reducerUtils = {
    // 초기 상태. 초기 data 값은 기본적으로 null 이지만
    // 바꿀 수도 있습니다.
    initial: (initialData = null) => ({
        loading: false,
        data: initialData,
        error: null
    }),
    // 로딩중 상태. prevState의 경우엔 기본값은 null 이지만
    // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있습니다.
    loading: (prevState = null) => ({
        loading: true,
        data: prevState,
        error: false
    }),
    // 성공 상태
    success: payload => ({
        loading: false,
        data: payload,
        error: false
    }),
    // 실패 상태
    error: error => ({
        loading: false,
        data: null,
        error: error
    }),
    success_CREATE_TODO: (state, payload) => ({
        loading: false,
        data: {
            ...state.todos.data,
            todoList: state.todos.data.concat(payload)
        },
        error: null
    }),
    success_UPDATE_TODO: (state, id) => ({
        loading: false,
        data: {
            ...state.todos.data,
            todoList: state.todos.data.todoList.map(t => {
                if (t.id === id) {
                    t.status = t.status === 'DONE' ? 'NEVER' : 'DONE';
                }
                return t;
            })
        },
        error: null
    }),
    success_DELETE_TODO: (state, id) => ({
        loading: false,
        data: {
            ...state.todos.data,
            todoList: state.todos.data.todoList.filter(t => t.id !== id)
        },
        error: null
    }),
};


/**********************************************
 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
 type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
 호출은 다음과 같이 한다 => handleAsyncActions(GET_POST, 'post')(state, action);
 **********************************************/
/** =====================================
 * GET TODO List
 * =====================================*/
export const handleAsyncActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case type:
                return {
                    ...state,
                    [key]: reducerUtils.loading(keepData ? state[key].data : null)
                };
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    };
};

/** =====================================
 * CREATE TODO
 * =====================================*/
export const handleAsyncCreateActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case SUCCESS:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        data: state[key].data.concat(action.payload)    // concat은 리스트에 append하는 함수.
                    }
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    };
};


/**
 * 통합 메소드) id를 이용해 요청을 보내는 Thunk
 */
// 특정 id 를 처리하는 Thunk 생성함수
const defaultIdSelector = param => param;
export const createPromiseThunkById = (
    type,
    promiseCreator,
    // 파라미터에서 id 를 어떻게 선택 할 지 정의하는 함수입니다.
    // 기본 값으로는 파라미터를 그대로 id로 사용합니다.
    // 하지만 만약 파라미터가 { id: 1, details: true } 이런 형태라면
    // idSelector 를 param => param.id 이런식으로 설정 할 수 있곘죠.
    idSelector = defaultIdSelector
) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return param => async dispatch => {
        // 파라미터는 하나만 들어온다고 가정! 파라미터 여러개일 때, 추후에 변경요망
        console.log("param: ", param);
        const $param = idSelector(param);
        dispatch({type, meta: $param});
        try {
            const payload = await promiseCreator($param);
            dispatch({type: SUCCESS, payload, meta: $param});
        } catch (e) {
            dispatch({type: ERROR, error: true, payload: e, meta: $param});
        }
    };
};

/**
 *
 */
// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    const callUtilFunc = (state, payload) => {
        console.log(state.todos)
        console.log(payload)
        switch (`success_${type}`) {
            case 'success_CREATE_TODO':
                return reducerUtils.success_CREATE_TODO(state, payload);
            case 'success_UPDATE_TODO':
                return reducerUtils.success_UPDATE_TODO(state, payload);
            case 'success_DELETE_TODO':
                return reducerUtils.success_DELETE_TODO(state, payload);
            default:
                return null;
        }
    };

    return (state, action) => {
        const id = action.meta;
        switch (action.type) {
            case SUCCESS:
                return {
                    ...state,
                    [key]: callUtilFunc(state, action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: {
                        ...state[key],
                        [id]: reducerUtils.error(action.payload)
                    }
                };
            default:
                return state;
        }
    };
};


/** ===============================================
 *  Account API
 =============================================== */
export const handleAsyncSignInActions = (type, key, keepData = false) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case SUCCESS:
                return {
                    ...state,
                    [key]: reducerUtils.success(action.payload)
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(action.payload)
                };
            default:
                return state;
        }
    };
};

export const handleAuthenticateActions = (type, key) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
    return (state, action) => {
        switch (action.type) {
            case SUCCESS:
                return {
                    ...state,
                    [key]: 
                        reducerUtils.success({
                            username: action.payload.username,
                            jwt: action.payload.jwt
                        }),
                };
            case ERROR:
                return {
                    ...state,
                    [key]: reducerUtils.error(true)
                };
            default:
                return state;
        }
    }
}