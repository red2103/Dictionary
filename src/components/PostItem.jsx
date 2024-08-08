import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    
    return (
        <div className="post">
            <div contextMenu="post__content">
                <div>{props.post.id}</div>
                <strong>{props.post.title}: {props.post.count}</strong>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem     