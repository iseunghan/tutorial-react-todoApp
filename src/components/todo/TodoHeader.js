import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTodos } from "../../api/todos";

const TodoHeadBlock = styled.div `
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
    }
    .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
    }
    .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
    }
`;

function TodoHeader() {
    const state = useSelector(state => state.todos);
    const [count, setCount] = useState(0);  // 여기서만 사용할 카운트 변수이므로 useState로 관리

    useEffect(() => {
        const {loading, data: todos, error} = state.todos;
        const undoneTasks = todos ? todos?.filter(todo => todo.status === 'NEVER') : [];   // done=true인 할일만 filter
        setCount(undoneTasks.length);
    }, [state])

    // 날짜 계산
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', {weekday: 'long'});

    return (
        <TodoHeadBlock>
            <h1> {dateString}</h1>
            <div className="day"> {dayName}</div>
            <div className="tasks-left">할일 {count}개 남음</div>
        </TodoHeadBlock>
    );
}

export default React.memo(TodoHeader);