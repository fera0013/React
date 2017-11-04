import { combineReducers } from 'redux'
import {
    RETRIEVE_POSTS,
    DELETE_POST,
    CREATE_POST,
    UPDATE_POST,
    VOTE_POST,
} from '../actions/post'

import {
    RETRIEVE_COMMENTS,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    CREATE_COMMENT, VOTE_COMMENT
} from '../actions/comments'

export default function reducer(
    state = {
        posts: new Map(),
        comments: new Map()
    },
    action
) {
    switch (action.type) {
        case CREATE_POST:
            var newState = { ...state };
            newState.posts.set(action.post.id,action.post)
            return newState
        case RETRIEVE_POSTS:
            var posts = new Map()
            action.posts.forEach((post)=>{posts.set(post.id,post)})
            return Object.assign({}, state, {
                posts: posts
            })
        case UPDATE_POST:
            var newState = { ...state };
            newState.posts.set(action.post.id,action.post)
            return newState
        case DELETE_POST:
            var newState = { ...state };
            newState.posts.delete(action.post_id)
            newState.comments.forEach((comment)=>{
                if(comment.parentId===action.post_id)
                {comment.parentDeleted===true}
            })
            return newState
        case VOTE_POST:
            var newState = { ...state };
            newState.posts.set(action.post.id,action.post)
            return newState
        case CREATE_COMMENT:
            var newState = { ...state };
            newState.comments.set(action.comment.id,action.comment)
            return newState
        case RETRIEVE_COMMENTS:
            var comments = new Map()
            action.comments.forEach((comment)=>{comments.set(comment.id,comment)})
            return Object.assign({}, state, {
                comments: comments
            })
        case UPDATE_COMMENT:
            var newState = { ...state };
            newState.comments.set(action.comment.id,action.comment)
            return newState
        case DELETE_COMMENT:
            var newState = { ...state };
            newState.comments.delete(action.comment_id)
            return newState
        case VOTE_COMMENT:
            var newState = { ...state };
            newState.comments.set(action.comment.id,action.comment)
            return newState
        default:
            return state
    }
}