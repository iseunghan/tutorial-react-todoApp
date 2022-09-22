import React from 'react';
import TodoListPage from '../pages/TodoListPage';
import TodoCreate from './todo/TodoCreate';
import TodoList from './todo/TodoList';

function Body() {
    return (
        <>
            {/* <TodoList /> */}
            <TodoListPage />
            <TodoCreate />
        </>
    );
}

export default Body;