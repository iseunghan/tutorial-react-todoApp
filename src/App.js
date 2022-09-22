import logo from './logo.svg';
import './App.css';
import {createGlobalStyle} from 'styled-components';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import TodoTemplate from './components/todo/TodoTemplate';
import TodoHeader from './components/todo/TodoHeader';

const GlobalStyle = createGlobalStyle `
  body {
    background: #e9ecef;
  }
`;

function App() {
    return (<>
        <GlobalStyle/>
        <TodoTemplate>
            <TodoHeader/>
            <Body/>
        </TodoTemplate>
        <Footer/>
    </>);
}

export default App;
