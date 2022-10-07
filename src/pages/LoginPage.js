import {
    Button,
    FormControl, OutlinedInput,
    TextField
} from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../modules/accounts';

function SignIn() { 
    const initialValue = {
        username: "",
        password: ""
    };
    // const [sent, setSent] = React.useState(false);
    const dispatch = useDispatch();
    const [signInRequest, setSignInReqeust] = React.useState(initialValue);

    const setUsername = e => {
        setSignInReqeust({
            ...signInRequest,
            username: e.target.value
        });
    };
    const setPasword = e => {
        setSignInReqeust({
            ...signInRequest,
            password: e.target.value
        });
    }; 
    const handleSubmit = e => {
        e.preventDefault();
        console.log("data: ", signInRequest)
        dispatch(signIn(signInRequest));
        setSignInReqeust(initialValue); // 초기화
    };

    return (
        <FormControl sx={
            {width: '25ch'}
        }>
            <TextField 
                label="Username"
                type="text"
                onChange={setUsername}
                value={signInRequest.username}
                />
            <TextField 
                id="outlined-disabled"
                label="Password" 
                type="password"
                value={signInRequest.password}
                onChange={setPasword}/>
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </FormControl>
    );
}

export default SignIn;
