import React from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextarea from "./UI/textarea/MyTextarea";


const PostForm = ({refresh, save, fetchWords, words}) => {
    const [post, setPost] = React.useState({title: ""})
    
    const addNewPost = (e) => {
        e.preventDefault()
        refresh(post.title)
        setPost({title: "", body: ""})
    }

    const saveWords = (e) => {
      e.preventDefault()
      save()
    }

    return (
      <form>
        <MyTextarea         
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
        type="text" 
        placeholder="text">
        </MyTextarea>
        <br />
        <MyButton onClick={addNewPost}>add text</MyButton>
        <br />
        <MyButton onClick={saveWords}>Save</MyButton>
      </form>
    )
}

export default PostForm