import axios from "axios";

/**
 * API 명세
 */
// const BASE_URL = "http://localhost:8080/todoList"
const BASE_URL = "/user/accounts"    // package.json -> proxy setting!

export const createTodo = async (param) => {
    const response = await axios.post(
        `${BASE_URL}/${param.username}/todolist`,
        { title: param.title }
    );  // ex: { id : 1 } 응답
    const id = response.data;
    response.data = {
        id: id,
        title: param.title,
        status: 'NEVER'
    }
    console.log("todos: ", response);
    return response.data;
}

export const getTodos = async (username) => {
    const response = await axios.get(`${BASE_URL}/${username}/todolist`);
    console.log("todos: ", response);
    let payload = response.data.content.todoList
    // let pageable = response.data.content.pageable
    // return response.data;
    return payload;
}

export const getTodoById = async (param) => {
    const response = await axios.get(`${BASE_URL}/${param.username}/todolist/${param.id}`);
    return response.data;
}

export const updateTodoById = async (param) => {
    console.log("api) ", param);
    const response = await axios.patch(`${BASE_URL}/${param.username}/todolist/${param.id}`);    // 200 코드만 날아옴.
    response.data = param.id; // 리듀서를 위해 넣어준 데이터
    console.log("patch: ", response);
    return response.data;
}

export const deleteTodoById = async (param) => {
    console.log("api ", param);
    const response = await axios.delete(`${BASE_URL}/${param.username}/todolist/${param.id}`);    // 200 코드만 날아옴.
    response.data = param.id; // 리듀서를 위해 넣어준 데이터
    console.log("patch: ", response);
    return response.data;
}