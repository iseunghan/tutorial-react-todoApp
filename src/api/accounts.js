import axios from "axios";
import { Cookies } from "react-cookie";
/**
 * Account API
 */
 const BASE_URL = "/user/accounts"    // package.json -> proxy setting!
var token = "";
 
export const signIn = async (account) => {
    let data = JSON.stringify(account);
    const response = await axios.post(
        '/login',
        data,
        {
            headers: {
                'content-type': 'application/json'
            }
        }
    );
    token = response.headers.authorization ?? token;

    let payload = {
        "username": account.username,
        "jwt": token
    }
    // console.log("response> ", payload);
    return payload;
};

export const authenticate = () => {
    const cookies = new Cookies();
    const jwt = cookies.get('Authorization');
    console.log("cookie: ", jwt)

    if(!jwt) {
        throw Error("unauth");
    }

    // extract jwt
    console.log(jwt)
    const decodeJWT = atob(jwt.split('.')[1]);
    const username = JSON.parse(decodeJWT).sub
    console.log(username)

    let payload = {
        "username": username,
        "jwt": jwt
    }
    return payload;
}