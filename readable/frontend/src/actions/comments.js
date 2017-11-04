import * as ReadableAPI from "../utils/ReadableAPI";
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const RETRIEVE_COMMENTS = 'RETRIEVE_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const UPDATE_COMMENT = "UPDATE_COMMENT"
const UP = 'UP'
const DOWN = 'DOWN'


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
        return ReadableAPI.upVoteComment(comment.id).then(dispatch(voteComment(comment,UP)))
    }
}

export function downVote(comment){
    return dispatch=>{
        return ReadableAPI.downVoteComment(comment.id).then( dispatch(voteComment(comment,DOWN)))
    }
}

export function updateComment(comment) {
    return dispatch => {
        return ReadableAPI.updateComment(comment).then(dispatch(update(comment)))
    }
}