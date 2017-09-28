import fetch from 'isomorphic-fetch'
import * as ReadableAPI from "../utils/ReadableAPI";

export const REQUEST_POSTS = 'REQUEST_COMMENTS'
export const RECEIVE_POSTS = 'RECEIVE_COMMENTS'
export const SELECT_CATEGORY = 'SELECT_POST'
export const INVALIDATE_CATEGORY = 'INVALIDATE_POST'



export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    }
}

export function invalidateCategory(category) {
    return {
        type: INVALIDATE_CATEGORY,
        category
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