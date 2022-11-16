import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TodoList from '../components/todo/TodoList';
import {getTodos, goHome, goLogin} from '../modules/todos';
import {useNavigate} from "react-router-dom";
import {Grid, Pagination, Skeleton} from "@mui/material";

function TodoListContainer() {
    const {data, loading, error} = useSelector(state => state.todos.todos);   // useSelector는 리덕스 스토어의 상태를 조회할 땐 만약 상태가 바뀌지 않았으면 리렌더링 하지 않는다.
    var LAST_PAGE = data ? data.pageable.totalPages : 0;
    const {data: account, loading: a_loading, error: a_error} = useSelector(state => state.accounts.account);   // useSelector는 리덕스 스토어의 상태를 조회할 땐 만약 상태가 바뀌지 않았으면 리렌더링 하지 않는다.
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (account) {
            dispatch(getTodos({username: account.username, page}));
        } 
        // else {
        //     console.log("go To Login Page")
        //     dispatch(goLogin(navigate))
        // }
    }, [page, dispatch]);

    if (loading && !data) {
        return (<>
            <Skeleton/>
            <Skeleton animation="wave"/>
            <Skeleton animation={false}/>
        </>);
    }
    if (error || !account) {
        console.log("에러 발생: ", error)
        // if (error.response.status !== 200) {
        //     alert("401 에러입니다. 로그인 페이지로 돌아갑니다.")
            // dispatch(goLogin(navigate))
            // return null;
        // }
        return <div>error!</div>;
    }
    if (!data) return null;

    const pagination = (e) => {
        e.preventDefault();
        console.log(e.target);
        const currentPage = e.target.outerText;
        console.log("선택된 페이지: ", currentPage);
        setPage(Number(currentPage));
        console.log(page)
    }

    return <>
        <TodoList todos={data ? data.todoList : []}/>
        <Grid container justifyContent={"center"} marginBottom={"50px"} >
            <Pagination count={LAST_PAGE} defaultPage={1} page={page} boundaryCount={2} onClick={ pagination } shape="rounded" />
        </Grid>
    </>;
}

export default TodoListContainer;
