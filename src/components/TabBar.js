import {Button} from "@mui/material";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import styled from "styled-components";

const Tab = styled.header `
    background: darkgreen;
    width: 100%;
    display: flex;
    color: white;
    padding: 30px;
    font-weight: 600;
    font-size: 20px;
    box-sizing: border-box;
`;

const MenuList = styled.div `
    display: flex;
    margin: 0px 20px;
`;
const MenuItem = styled.div `
    margin: 0px 20px;
`;


function TabBar() {
    return (
        <>
            <Tab>
                <div>TAB BAR</div>
                <MenuList>
                    <Button variant="outlined">
                        <Link to={"/"}>Home</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to={"/todo"}>TodoList</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to={"/about"}>About</Link>
                    </Button>
                    <Button variant="outlined">
                        <Link to={"/login"}>login</Link>
                    </Button>

                </MenuList>
            </Tab>
            <Outlet/>
        </>
    );
}

export default TabBar
