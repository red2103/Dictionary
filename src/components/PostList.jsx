import React from "react";
import PostItem from "./PostItem";

const PostList = ({words, remove}) => {
  // console.log(words)
    return (
        <div>
          {words.length !== 0
            ?
            words.map((post) =>
              <PostItem remove={remove} post={post} key={post.id}/>
            )
            : 
            <h1 style={{textAlign: "center"}}>
              not words
            </h1>
            }
        </div>
    )
}

export default PostList;