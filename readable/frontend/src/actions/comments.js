import fetch from 'isomorphic-fetch'
import * as ReadableAPI from "../utils/ReadableAPI";

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_POST = 'SELECT_POST'
export const INVALIDATE_POST = 'INVALIDATE_POST'



export function selectPost(post) {
    return {
        type: SELECT_POST,
        post
    }
}

export function invalidatePost(post) {
    return {
        type: INVALIDATE_POST,
        post
    }
}

function requestComments(POST) {
    return {
        type: REQUEST_COMMENTS,
        POST
    }
}

function receiveComments(post, comments) {
    return {
        type: RECEIVE_COMMENTS,
        post,
        posts: comments,
        receivedAt: Date.now()
    }
}

function fetchComments(post) {
    return dispatch => {
        dispatch(requestComments(post))
        return ReadableAPI.getAllComments(post).then(comments => dispatch(receiveComments(post, comments)))
    }
}

function shouldFetchComments(state,post) {
    const comments = state.comments[post]
    if (!comments) {
        return true
    } else if (comments.isFetching) {
        return false
    } else {
        return comments.didInvalidate
    }
}

export function fetchCommentsIfNeeded(post) {
    return (dispatch, getState) => {
        if (shouldFetchComments(getState(), post)) {
            return dispatch(fetchComments(post))
        }
    }
}