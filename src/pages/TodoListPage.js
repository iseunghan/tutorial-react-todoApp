import { Grid, Pagination } from "@mui/material";
import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "../components/todo/TodoCreate";
import TodoHeader from "../components/todo/TodoHeader";
import TodoTemplate from "../components/todo/TodoTemplate";
import TodoListContainer from "../containers/TodoListContainers";

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
        <Grid container justifyContent={"center"}>
        <Pagination count={10} shape="rounded" />
        </Grid>
    </>);
}

export default TodoListPage;
