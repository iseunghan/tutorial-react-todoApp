import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "../components/todo/TodoCreate";
import TodoHeader from "../components/todo/TodoHeader";
import TodoTemplate from "../components/todo/TodoTemplate";
import TodoListContainer from "../containers/TodoListContainers";
import SignIn from "./LoginPage";

const GlobalStyle = createGlobalStyle `
  body {
    background: #e9ecef;
  }
`;

function TodoListPage() {
    
    return (<>
        <GlobalStyle />
        <TodoTemplate>
            <TodoHeader/>
            <TodoListContainer/>
            <TodoCreate />
        </TodoTemplate>
    </>);
}

export default TodoListPage;
