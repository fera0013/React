import { combineReducers } from 'redux'
import {
    SELECT_CATEGORY,
    REQUEST_POSTS,
    RECEIVE_POSTS,
    DELETE_POST, ADD_POST, UPDATE_POST,
} from '../actions/post'

import {
    SELECT_POST,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    DELETE_COMMENT, UPDATE_COMMENT, CREATE_COMMENT
} from '../actions/comments'

export default function reducer(
    state = {
        posts: [],
        comments: []
    },
    action
) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                posts: action.posts
            })
        case ADD_POST:
            var newState = { ...state };
            newState.posts.push(action.post)
            return newState
        case UPDATE_POST:
        case DELETE_POST:
            var newState = { ...state };
            newState.posts.find((post)=>{return post.id===action.post_id}).deleted = true
            return newState
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                comments: action.comments
            })
        case CREATE_COMMENT:
        case UPDATE_COMMENT:
        case DELETE_COMMENT:
        default:
            return state
    }
}