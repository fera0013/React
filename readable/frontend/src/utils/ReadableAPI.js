
const api = "http://localhost:3001"


// Generate a unique token for storing posts data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data =>data.categories.map((category)=>category.name))

export const getAllPosts = () => fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)


export const getCommentsForPost = (post_id) => fetch(`${api}/posts/${post_id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)



export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const deletePost = (post_id) =>
    fetch(`${api}/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
