import React, { useState, useEffect } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import wordsService from './API/wordsService'

import { setSelectionRange } from '@testing-library/user-event/dist/utils';


function elicitWords(text) {
  return text.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/).filter(word => isNaN(Number(word)));
} 


function addSentences(wordCount, sentences) {
    const newWords = elicitWords(sentences)
    for (const word of newWords) {
        const index = wordCount.findIndex(obj => obj.hasOwnProperty(word));
        if (index >= 0) {
          wordCount[index] = {[Object.keys(wordCount[index])] : Object.values(wordCount[index])[0] +1 }
        } else {
          wordCount.push({[word]: 1})
        }
        
    }
    
}   

const addPost = (word, id) => {
  return {
    id: id,
    title: word,
    count: 1
  }
}

function create_new_words(words_list, old_words) {
  const words = old_words
  let id = Date.now()

  for (const word of words_list) {
    const wordToUpdate = words.find(post => post.title === word);
    if (wordToUpdate) {
      wordToUpdate.count += 1
    } else {
      id +=1
      words.push(addPost(word, id))
    }
  }
  return words
}



let data = [] 


function App() {
  const [words, setPosts] = useState(data)
  const [selectedSort, setSelectedSort] = useState();



  const refreshWord = (text) => {
    const words_list = elicitWords(text)
    const new_words = create_new_words(words_list, [...words])
    setPosts([...new_words])
  }  

  const removeWord = (word) => {  
    setPosts(words.filter(p => p.id !== word.id))
  }

  const sortWords = (sort) => {
    setSelectedSort(sort)
    if (sort == "title") {
      setPosts([...words].sort((a, b) => a.title.localeCompare(b.title)))
    } if (sort == "const") {
      setPosts([...words].sort((a, b) => b.count - a.count))
    }
  }

  async function fetchWords() {
    const words = await wordsService.getAll()
    setPosts(JSON.parse(words))
  }

  async function saveWords() {
    await wordsService.postAll(words)
  }

  useEffect(() => {
    fetchWords()
  }, [])


  return (
    <div className="App">
      <button onClick={fetchWords}>Restore</button>

      <PostForm refresh={refreshWord} save={saveWords} words={words} fetchWords={fetchWords}/>

      <div>
        <MySelect
          value={selectedSort}
          onChange={sortWords}
          defaultValue={"sorted"}
          options={[
            {value:"const", name: "Descending"},
            {value:"title", name: "word sorted"}
          ]}
        />
      </div>

      <PostList remove={removeWord} words={words}/>      
    </div>
  );
}

export default App; 
