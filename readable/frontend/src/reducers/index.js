import { combineReducers } from 'redux'
import {
    SELECT_CATEGORY,
    INVALIDATE_CATEGORY,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions/index'

function selectedCategory(state = 'reactjs', action) {
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

const rootReducer = combineReducers({
    postsByCategory,
    selectedCategory
})

export default rootReducer