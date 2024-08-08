import React from "react";
import classes from "./myTextarea.module.css"

const MyTextarea = (props) => {
    return (
        <textarea className={classes.myInput} {...props}></textarea>
    )
}

export default MyTextarea