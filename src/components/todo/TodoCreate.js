import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { createTodo, getTodos } from "../../modules/todos";
import { useSelect } from "@mui/base";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

/**
 * 할일 생성을 위한 폼
 * @returns 할일 생성 폼
 */
function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const {username, jwt} = useSelector(state => state.accounts.account);

    // const dispatch = useTodosDispatch();
    // const nextId = useTodoNextId();
    const dispatch = useDispatch();
    const onToggle = () => setOpen(!open);
    const onChange = e => setTitle(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault(); // 새로고침 방지 & 기본동작 방지
        dispatch(createTodo({title, username}));
        setTitle('');
    };

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={ onSubmit }>
                        <Input 
                            autoFocus 
                            placeholder="할 일을 입력 후, Enter를 눌러주세요" 
                            onChange={ onChange }
                            value= { title }
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={ onToggle } open={ open }>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);  // 성능 최적화를 위함.