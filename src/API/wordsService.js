import axios from "axios"

const path = 'http://localhost:3001/data'

export default class PostService {
    static async getAll() {
        const response = await axios.get(path)
        return response.data
    }
    static async postAll(words) {
        const response = await axios.post(path, words)
        return response.data
    }
}