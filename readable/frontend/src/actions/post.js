import * as ReadableAPI from "../utils/ReadableAPI";
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RETRIEVE_POSTS = 'RETRIEVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
const UP = 'UP'
const DOWN = 'DOWN'



function votePost(post,direction){
    return {
        type: VOTE_POST,
        post,
        direction
    }
}

function update(post){
    return {
        type: UPDATE_POST,
        post
    }
}

function addPost(post){
    return {
        type: CREATE_POST,
        post
    }
}


function receivePosts(posts) {
    return {
        type: RETRIEVE_POSTS,
        posts: posts,
        receivedAt: Date.now()
    }
}

function deletePost(post_id){
    return{
        type: DELETE_POST,
        post_id: post_id
    }
}

export function fetchPosts() {
    return dispatch => {
        return ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)))
    }
}


export function removePost(post){
    return (dispatch) => {
        return ReadableAPI.deletePost(post.id).then(dispatch(deletePost(post.id)))
    }
}


export function createPost(post) {
    return dispatch => {
        return ReadableAPI.createPost(post).then(dispatch(addPost(post)))
    }
}


export function upVote(post){
    return dispatch=>{
        return ReadableAPI.upVotePost(post.id).then(dispatch(votePost(post,UP)))
    }
}

export function downVote(post){
    return dispatch=>{
        return ReadableAPI.downVotePost(post.id).then(dispatch(votePost(post,DOWN)))
    }
}

export function updatePost(post) {
    return dispatch => {
        return ReadableAPI.updatePost(post).then(dispatch(update(post)))
    }
}