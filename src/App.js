import React, { useState } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import axios from 'axios';
import wordsService from './API/wordsService'

function elicitWords(text) {
  return text.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/).filter(word => isNaN(Number(word)));
} 

function addSentences(wordCount, sentences) {
  const newWords = elicitWords(sentences)


  for (const new_word of newWords) {
    const result = wordCount.find(word => word.title == new_word);
    if (result) {
      console.log('run')
      result.count += 1
    }
  }

  return wordCount
}   

function my_func(p) {
  const new_word = 'text'
  const result = p[{title : 'text'}];
  result.count +=1
}






let data = [] 

let i = 0 

function App() {
  const [posts, setPosts] = useState(data)

  const addPost = (word, id) => {
    return {
      id: id,
      title: word,
      count: 1
    }
  }


  const refreshWord = (text) => {
    const words_list = elicitWords(text)
    let id = Date.now()
    const new_words = []
    for (const word of words_list) {
      const wordToUpdate = posts.find(post => post.title === word);
      if (wordToUpdate) {
        wordToUpdate.count += 1
      } else {
        id +=1
        new_words.push(addPost(word, id))
      }
    }

    setPosts([...posts, ...new_words])
  }  

  const removeWord = (word) => {
    setPosts(posts.filter(p => p.id !== word.id))
  }

  async function fetchWords() {
    const words = await wordsService.getAll()
    setPosts(JSON.parse(words))
  }

  async function saveWords() {
    const response = await axios.post('http://localhost:3001/data', posts);
    console.log(response.data)
  }

  if (i == 0) {
    fetchWords()
    i = 1
  } 
  return (
    <div className="App">
      <button onClick={fetchWords}>Restore</button>

      <PostForm refresh={refreshWord} save={saveWords} posts={posts} fetchWords={fetchWords}/>

      <PostList remove={removeWord} posts={posts}/>
    </div>
  );
}

export default App; 
