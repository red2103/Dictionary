import React from "react";
import MyButton from "./UI/button/MyButton";

const WordsItem = (props) => {
    
    return (
        <div className="word">
            <div contextMenu="word__content">
                {/* <div>{props.post.id}</div> */}
                <strong>{props.post.title}: {props.post.count}</strong>
            </div>
            <div className="word__btns">
                <MyButton onClick={() => props.remove(props.post)}>delete</MyButton>
            </div>
        </div>
    )
}

export default WordsItem     