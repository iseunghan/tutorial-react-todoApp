import axios from "axios";
import { Cookies } from "react-cookie";
/**
 * Account API
 */
const BASE_URL = "/user/accounts"    // package.json -> proxy setting!

const cookie = new Cookies();

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
    const token = response.headers.authorization;

    let payload = {
        "username": account.username,
        "jwt": token
    }
    return payload;
};

export const authenticate = async () => {
    const response = await axios.get(
        '/authenticate',
        {
            headers: {
                'content-type': 'application/json'
            }
        }
    );
    // no auth
    if(response.status !== 200) {
        return {
            message: "인증이 필요합니다."
        }
    }

    /**
     * 일단 백엔드에서 exposeHeader를 하지 않아서 보이지 않는다.
     * 임시 방편으로 cookie를 읽어서 하는 방식으로 해결.
     */
    // const jwt = response.headers.authorization;
    
    const jwt = cookie.get('Authorization');
    // extract jwt
    let decodeJWT;
    try {
     decodeJWT = atob(jwt.split('.')[1]);
    } catch (e) {
        
    }
    const username = JSON.parse(decodeJWT).sub
    console.log("extract Token: ", username);

    // Cookie에 값을 설정?
    // const cookies = new Cookies();
    // const jwt = cookies.get('Authorization');
    // console.log("cookie: ", jwt)

    let payload = {
        "username": username,
        "jwt": jwt
    }

    return payload;
}