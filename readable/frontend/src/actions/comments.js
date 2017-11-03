import * as ReadableAPI from "../utils/ReadableAPI";
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS'
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



function voteComment(comment,direction){
    return {
        type: VOTE_COMMENT,
        comment,
        direction
    }
}


function update(comment){
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

function deleteComment(comment){
    return{
        type: DELETE_COMMENT,
        comment
    }
}


function receiveComments(post_id, comments) {
    return {
        type: RETRIEVE_COMMENTS,
        post_id,
        comments,
        receivedAt: Date.now()
    }
}

export function fetchComments(post_id) {
    return dispatch => {
        return ReadableAPI.getCommentsForPost(post_id).then(comments => dispatch(receiveComments(post_id, comments)))
    }
}

export function removeComment(comment){
    return (dispatch) => {
        return ReadableAPI.deleteComment(comment.id).then(comment => dispatch(deleteComment(comment)))
    }
}

export function upVote(comment){
    return dispatch=>{
        dispatch(voteComment(comment,UP))
        return ReadableAPI.upVoteComment(comment.id)
    }
}

export function downVote(comment){
    return dispatch=>{
        dispatch(voteComment(comment,DOWN))
        return ReadableAPI.downVoteComment(comment.id)
    }
}

export function updateComment(comment) {
    return dispatch => {
        dispatch(update(comment))
        return ReadableAPI.updateComment(comment)
    }
}