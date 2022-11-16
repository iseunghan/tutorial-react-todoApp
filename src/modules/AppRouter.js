import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Copyright } from "../components/Footer";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import TodoListPage from "../pages/TodoListPage";
import { authenticate } from "./accounts";

/***********************************
 * Router에 대해서 정의
 ***********************************/
export default function AppRouter() {
    const {data: account, loading, error} = useSelector(state => state.accounts.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cookie = new Cookies();
    const jwtToken = cookie.get('Authorization') ?? "";

    /**
     * refresh가 될 때 마다 쿠키에 저장된 jwt를 가지고 인증을 시도해본다. 
     * 인증이 완료가 된다면 현재 정보를 리덕스 스토어에 저장시킨다!
     */
    useEffect(() => {
        // if(jwtToken){
        //     console.log("/authenticate 호출~")
        //     console.log("토큰에서 추출한 유저명: ", JSON.parse(atob(jwtToken.split(".")[1])).sub)
        // }
        dispatch(authenticate());
    }, [dispatch]);

    return (
        <>
            <Routes >
                { !error ? 
                (<>
                    <Route path="/" element={<HomePage jwtToken={jwtToken} />}/>
                    <Route path="/login" element={<LoginPage isAuthError={error} />}/>
                    <Route path="/todo" element={<TodoListPage />}/>
                    <Route path="/about" element={<AboutPage jwtToken={jwtToken} />}/>
                </>) : 
                (<>
                    <Route path="/" element={<HomePage jwtToken={jwtToken} />}/>
                    <Route path="/login" element={<LoginPage jwtToken={jwtToken} />}/>
                    <Route path="*" element={<Navigate replace to="/login" />} />
                </>)}
                {/* <Route path="*" element={<Navigate replace to="/login" />} /> */}
            </Routes>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </>
    );
}