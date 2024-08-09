import React from "react";
import WordsItem from "./WordsItem";

const WordsList = ({words, remove}) => {
  // console.log(words)
    return (
        <div>
          {words.length !== 0
            ?
            words.map((post) =>
              <WordsItem remove={remove} post={post} key={post.id}/>
            )
            : 
            <h1 style={{textAlign: "center"}}>
              not words
            </h1>
            }
        </div>
    )
}

export default WordsList;