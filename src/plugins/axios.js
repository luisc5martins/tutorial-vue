import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjQ5ZGU0ZmY5YTkzZGU4ZDZkOWMxZGE0NjVlZjAwMSIsInN1YiI6IjY1MDQ5MTlhYzkyYzVkMDBmZWJmMDY4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kTAZi0zFMcHAYn36aC49eTlsMD2o-NNCeAhki5hLlpg`
  }
})

export default api