import * as ReadableAPI from "../utils/ReadableAPI";
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
const UP = 'UP'
const DOWN = 'DOWN'

export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    }
}

function votePost(post_id,direction){
    return {
        type: VOTE_POST,
        post_id,
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
        type: ADD_POST,
        post
    }
}

function requestPosts(category) {
    return {
        type: REQUEST_POSTS,
        category
    }
}

function receivePosts(category, posts) {
    return {
        type: RECEIVE_POSTS,
        category,
        posts: posts,
        receivedAt: Date.now()
    }
}

function deletePost(post_id){
    return{
        type: DELETE_POST,
        post: post_id
    }
}

function fetchPosts(category) {
    return dispatch => {
        dispatch(requestPosts(category))
        return ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(category, posts)))
    }
}

function shouldFetchPosts(state, category) {
    const posts = state.postsByCategory[category]
    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(category) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), category)) {
            return dispatch(fetchPosts(category))
        }
    }
}

export function removePost(post){
    return (dispatch) => {
        dispatch(deletePost(post.id))
        ReadableAPI.deletePost(post.id).then((posts)=>{
            return dispatch(receivePosts(post.category,posts))
        })
    }
}


export function createPost(post) {
    return dispatch => {
        dispatch(addPost(post))
        return ReadableAPI.createPost(post).then(posts => dispatch(receivePosts(post.category, posts)))
    }
}


export function upVote(post_id){
    return dispatch=>{
        dispatch(votePost(post_id,UP))
        return ReadableAPI.upVotePost(post_id)
    }
}

export function downVote(post_id){
    return dispatch=>{
        dispatch(votePost(post_id,DOWN))
        return ReadableAPI.downVotePost(post_id)
    }
}

export function updatePost(post) {
    console.log(post)
    return dispatch => {
        dispatch(update(post))
        return ReadableAPI.updatePost(post)
    }
}