import * as ReadableAPI from "../utils/ReadableAPI";

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_POST = 'SELECT_POST'



export function selectPost(post_id) {
    return {
        type: SELECT_POST,
        post_id
    }
}


function requestComments(post_id) {
    return {
        type: REQUEST_COMMENTS,
        post_id
    }
}

function receiveComments(post_id, comments) {
    return {
        type: RECEIVE_COMMENTS,
        post_id,
        comments: comments,
        receivedAt: Date.now()
    }
}

function fetchComments(post_id) {
    return dispatch => {
        dispatch(requestComments(post_id))
        return ReadableAPI.getCommentsForPost(post_id).then(comments => dispatch(receiveComments(post_id, comments)))
    }
}

function shouldFetchComments(state,post_id) {
    const comments = state.commentsByPost[post_id]
    if (!comments) {
        return true
    } else if (comments.isFetching) {
        return false
    } else {
        return comments.didInvalidate
    }
}

export function fetchCommentsIfNeeded(post_id) {
    return (dispatch, getState) => {
        if (shouldFetchComments(getState(), post_id)) {
            return dispatch(fetchComments(post_id))
        }
    }
}