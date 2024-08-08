const fs = require('fs').promises


const path = './dic.json'

const data = [
    {id:1, title:"text", count:3},
    {id:2, title:"text2", count:3},
    {id:3, title:"text3", count:3},
    {id:4, title:"text4", count:3}
]

async function write(config) {
    await fs.writeFile(path, JSON.stringify(config, null, 2))
}

async function read() {
    const data = await fs.readFile(path, 'utf8')
    const jsonDate = JSON.parse(data);
    return jsonDate
}

saveWords = async (config) => {
    await fs.writeFile(path, JSON.stringify(config, null, 2))
}


async function go() {
    // let words = await read()
    // console.log(words)
    // write(data)
    words = await read()
    console.log(words)
    await saveWords(data)
    words = await read()
    console.log(words)
}





go()

module.exports = {data}

