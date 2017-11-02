import * as ReadableAPI from "../utils/ReadableAPI";
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_POST = 'SELECT_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const UPDATE_COMMENT = "UPDATE_COMMENT"
const UP = 'UP'
const DOWN = 'DO'


function createComment(comment){
    return {
        type: CREATE_COMMENT,
        comment
    }
}


export function create(comment) {
    return dispatch => {
        dispatch(createComment(comment))
        return ReadableAPI.createComment(comment)
    }
}


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


function update(comment){
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

function deleteComment(comment_id){
    return{
        type: DELETE_COMMENT,
        comment: comment_id
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

export function fetchComments(post_id) {
    return dispatch => {
        return ReadableAPI.getCommentsForPost(post_id).then(comments => dispatch(receiveComments(post_id, comments)))
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

export function updateComment(comment) {
    return dispatch => {
        dispatch(update(comment))
        return ReadableAPI.updateComment(comment)
    }
}