import logo from './logo.svg';
import './App.css';
import {createGlobalStyle} from 'styled-components';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import TodoTemplate from './components/todo/TodoTemplate';
import TodoHeader from './components/todo/TodoHeader';
import { Route, Routes } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import LoginPage from './pages/LoginPage';
import SignIn from './pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import {Cookies} from 'react-cookie'
import { authenticate } from './modules/accounts';
import { useEffect } from 'react';

function App() {
    const { username, jwt } = useSelector(state => state.accounts.account);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("> " , username)
        dispatch(authenticate());
    }, [username, dispatch]);

    var isAuthorized = !username ? false : true;

    return (<>
    <Header />
    <Routes>
      <Route path="/" element={
        !isAuthorized ? <SignIn /> : <TodoListPage />
      }></Route>
      <Route path="/todo" element={<TodoListPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </>);
}

export default App;
