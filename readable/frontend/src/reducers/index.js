import { combineReducers } from 'redux'
import {
    SELECT_CATEGORY,
    INVALIDATE_CATEGORY,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions/post'

import {
    SELECT_POST,
    INVALIDATE_POST,
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS
} from '../actions/comments'

function selectedCategory(state = 'all', action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.category
        default:
            return state
    }
}

function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_CATEGORY:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsByCategory(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_CATEGORY:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.category]: posts(state[action.category], action)
            })
        default:
            return state
    }
}

function selectedPost(state = '', action) {
    switch (action.type) {
        case SELECT_POST:
            return action.post_id
        default:
            return state
    }
}

function comments(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.comments,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function commentsByPost(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_POST:
        case RECEIVE_COMMENTS:
        case REQUEST_COMMENTS:
            return Object.assign({}, state, {
                [action.post_id]: comments(state[action.post_id], action)
            })
        default:
            return state
    }
}


const rootReducer = combineReducers({
    postsByCategory,
    selectedCategory,
    commentsByPost,
    selectedPost
})

export default rootReducer