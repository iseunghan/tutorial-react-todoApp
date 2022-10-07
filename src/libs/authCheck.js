import React from 'react';
import { useSelector } from 'react-redux';

function authCheck() {
    const { data, loading, error } = useSelector(state => state.accounts.account);

    console.log(data.jwt)
}

export default authCheck;