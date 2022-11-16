import React from 'react';
import {Typography} from "@mui/material";

export function Copyright() {
    return (
      <Typography variant={"body2"} color={"textSecondary"} align={"center"} >
          {"Copyright © "}
          iseunghan, {new Date().getFullYear()}
          {"."}
      </Typography>
    );
}

function Footer() {
    return (
        <div className='Footer'>
            <h3>bottom</h3>
        </div>
    );
}

export default Footer;