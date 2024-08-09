import React, { useState, useEffect } from 'react';
import './App.css';
import WordsList from './components/WordsList';
import WordsForm from './components/WordsForm';
import MySelect from './components/UI/select/MySelect';
import wordsService from './API/wordsService'


function elicitWords(text) {
  return text.toLowerCase().replace(/[^\w\s]|_/g, "").split(/\s+/).filter(word => isNaN(Number(word)));
} 


function create_new_words(words_list, words) {
  let id = Date.now()

  for (const word of words_list) {
    const wordToUpdate = words.find(post => post.title === word);
    if (wordToUpdate) {
      wordToUpdate.count += 1
    } else {
      console.log(word)
      id += 1
      words.push({
        id: id,
        title: word,
        count: 1   
      })
    }
  }
  console.log(words)
  return words
}



let data = [] 


function App() {
  const [words, setWords] = useState(data)
  const [selectedSort, setSelectedSort] = useState();



  const refreshWord = (text) => {
    const words_list = elicitWords(text)
    const new_words = create_new_words(words_list, [...words])
    setWords([...new_words])
  }  

  const removeWord = (word) => {  
    setWords(words.filter(p => p.id !== word.id))
  }

  const sortWords = (sort) => {
    setSelectedSort(sort)
    if (sort == "title") {
      setWords([...words].sort((a, b) => a.title.localeCompare(b.title)))
    } if (sort == "const") {
      setWords([...words].sort((a, b) => b.count - a.count))
    }
  }

  async function fetchWords() {
    const words = await wordsService.getAll()
    setWords(JSON.parse(words))
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

      <WordsForm refresh={refreshWord} save={saveWords} words={words} fetchWords={fetchWords}/>

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

      <WordsList remove={removeWord} words={words}/>      
    </div>
  );
}

export default App; 
