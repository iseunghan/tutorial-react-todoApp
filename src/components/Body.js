import React from 'react';
import TodoListPage from '../pages/TodoListPage';
import TodoCreate from './todo/TodoCreate';

function Body() {
    return (
        <>
            <TodoListPage />
            <TodoCreate />
        </>
    );
}

export default Body;