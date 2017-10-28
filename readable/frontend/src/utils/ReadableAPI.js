
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

export const createComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())


export const deletePost = (post_id) =>
    fetch(`${api}/posts/${post_id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

export const deleteComment = (comment_id) =>
    fetch(`${api}/comments/${comment_id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

const votePost = (post_id,option) =>
    fetch(`${api}/posts/${post_id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res => res.json())

export function upVotePost(post_id){
    votePost(post_id,'upVote')
}

export function downVotePost(post_id){
    votePost(post_id,'downVote')
}

const voteComment = (comment_id,option) =>
    fetch(`${api}/comments/${comment_id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
    }).then(res => res.json())

export function upVoteComment(comment_id){
    voteComment(comment_id,'upVote')
}

export function downVoteComment(comment_id){
    voteComment(comment_id,'downVote')
}

export const updatePost=(post) =>
fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
}).then(res => res.json())

export const updateComment=(comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
