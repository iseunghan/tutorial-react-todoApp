import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

var loading = false;
var error = false;

function TodoList({ todos }) {
    if (loading) return <div>loading..</div>
    if (error) return <div>error!</div>

    return (
        <TodoListBlock>
            { /* 여러개의 todo 렌더링을 한줄로 표현 */ }
            { todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    desc={todo.desc}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
}

export default TodoList;