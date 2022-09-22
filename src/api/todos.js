import axios from "axios"

/**
 * API 명세
 */
// const BASE_URL = "http://localhost:8080/todoList"
const BASE_URL = "/todoList"    // package.json -> proxy setting!

export const createTodo = async desc => {
    const response = await axios.post(
        BASE_URL,
        { desc: desc }
    );  // ex: { id : 1 } 응답
    const id = response.data;
    response.data = {
        id: id,
        desc: desc,
        done: false
    }
    console.log("todos: ", response);
    return response.data;
}

export const getTodos = async () => {
    const response = await axios.get(BASE_URL);
    console.log("todos: ", response);
    return response.data;
}

export const getTodoById = async id => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
}

export const updateTodoById = async id => {
    console.log("api ", id);
    const response = await axios.patch(`${BASE_URL}/${id}`);    // 200 코드만 날아옴.
    response.data = id; // 리듀서를 위해 넣어준 데이터
    console.log("patch: ", response);
    return response.data;
}

export const deleteTodoById = async id => {
    console.log("api ", id);
    const response = await axios.delete(`${BASE_URL}/${id}`);    // 200 코드만 날아옴.
    response.data = id; // 리듀서를 위해 넣어준 데이터
    console.log("patch: ", response);
    return response.data;
}