import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';
import { deleteTodo, updateTodo } from "../../modules/todos";
import { useDispatch, useSelector } from "react-redux";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`; // hover시 위에 선언한 Remove 컴포넌트를 보여주도록 설정

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`; // scss에서 props에 접근할 수 있음!

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

// props.을 사용하지 않고 property 명을 적어줌으로써 간결하게 표현 가능!
function TodoItem({ id, done, desc }) {
    const dispatch = useDispatch();

    const $updateTodo = () => {
        dispatch(updateTodo({id}));
    }

    const $deleteTodo = () => {
        dispatch(deleteTodo({id}));
    }

    return (
        <TodoItemBlock>
            <CheckCircle done={ done } onClick={ $updateTodo }>
                { done && <MdDone /> }  { /* &&은 done이 false일 때 MdDone이 사용됨, true라면 해당 코드들은 무시됨. */ }
            </CheckCircle>
            <Text done={ done }>{ desc }</Text>
            <Remove>
                <MdDelete onClick={ $deleteTodo }/>
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);    
// 컴포넌트의 props가 바뀌지 않았다면, 불필요한 리렌더링을 방지하게 되어 성능 최적화 할 수 있음.