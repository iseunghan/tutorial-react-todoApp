import { Avatar, Container, Grid, Stack } from "@mui/material";
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 *  사용자의 정보를 보여주는 페이지
 */
function AboutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split('')[0]}`,
        };
    }

    return (
        <>
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
            <Stack>
                <Avatar {...stringAvatar("account.username")} />
                <>{"account.username"}</>
            </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default AboutPage;