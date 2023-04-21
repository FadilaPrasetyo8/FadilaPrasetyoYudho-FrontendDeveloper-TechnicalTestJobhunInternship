import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.tvmaze.com'
})

export async function allShows() {
    const res = await api.get('/shows')

    return res.data
}

export async function searchShows(q) {
    const response = await api.get('/search/shows', {
      params: {
        q,
      }
    })
  
    return response.data.map((data) => data.show)
  }
