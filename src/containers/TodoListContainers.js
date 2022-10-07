import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoList from '../components/todo/TodoList';
import { getTodos } from '../modules/todos';

function TodoListContainer() {
    const { data, loading, error } = useSelector(state => state.todos.todos);   // useSelector는 리덕스 스토어의 상태를 조회할 땐 만약 상태가 바뀌지 않았으면 리렌더링 하지 않는다.
    const { username } = useSelector(state => state.accounts.account);   // useSelector는 리덕스 스토어의 상태를 조회할 땐 만약 상태가 바뀌지 않았으면 리렌더링 하지 않는다.
    const dispatch = useDispatch();
    console.log(username)

    useEffect(() => {
        dispatch(getTodos(username));
    }, [dispatch]);

    if(loading && !data) return <div>loading..</div>;
    if(error) return <div>error!</div>;
    if(!data) return null;

    return <TodoList todos={data} />;
}

export default TodoListContainer;
