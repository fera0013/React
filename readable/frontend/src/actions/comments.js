import * as ReadableAPI from "../utils/ReadableAPI";
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_POST = 'SELECT_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
const UP = 'UP'
const DOWN = 'DOWN'


export function selectPost(post_id) {
    return {
        type: SELECT_POST,
        post_id
    }
}

function voteComment(comment_id,direction){
    return {
        type: VOTE_COMMENT,
        comment_id,
        direction
    }
}

function deleteComment(comment_id){
    return{
        type: DELETE_COMMENT,
        comment: comment_id
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

export function removeComment(comment_id){
    return (dispatch) => {
        dispatch(deleteComment(comment_id))
        ReadableAPI.deleteComment(comment_id).then(()=>{
            return dispatch(fetchComments())
        })
    }
}

export function upVote(comment_id){
    return dispatch=>{
        dispatch(voteComment(comment_id,UP))
        return ReadableAPI.upVoteComment(comment_id)
    }
}

export function downVote(comment_id){
    return dispatch=>{
        dispatch(voteComment(comment_id,DOWN))
        return ReadableAPI.downVoteComment(comment_id)
    }
}