import {
    RETRIEVE_POSTS,
    DELETE_POST,
    CREATE_POST,
    UPDATE_POST,
    VOTE_POST,
} from '../actions/post'

import {
    RETRIEVE_COMMENTS,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    CREATE_COMMENT, VOTE_COMMENT
} from '../actions/comments'

export default function reducer(
    state = {
        posts: new Map(),
        comments: new Map(),
    },
    action
) {
    switch (action.type) {
        case CREATE_POST:
            var newState = { ...state };
            newState.posts.set(action.post.id,action.post)
            return newState
        case RETRIEVE_POSTS:
            var posts=new Map()
            action.posts.forEach((post)=>{posts.set(post.id,post)})
            return Object.assign({}, state,  {
                ...state,
                posts
            })
        case UPDATE_POST:
            var newState = { ...state };
            newState.posts.set(action.post.id,action.post)
            return newState
        case DELETE_POST:
            var posts= new Map(state.posts)
            posts.delete(action.post_id)
            return Object.assign({}, state,  {
                ...state,
                posts
            })
        case VOTE_POST:
            //There must be a more elegant way to do this
            var posts= new Map(state.posts)
            var newPost= {...state.posts.get(action.post.id)}
            newPost.voteScore = action.newVote
            posts.set(newPost.id,newPost)
            return Object.assign({}, state,  {
                ...state,
                posts
            })
        case CREATE_COMMENT:
            var newState = { ...state };
            newState.comments.set(action.comment.id,action.comment)
            return newState
        case RETRIEVE_COMMENTS:
            var comments= new Map(state.comments)
            action.comments.forEach((comment)=>{comments.set(comment.id,comment)})
            return Object.assign({}, state,  {
                ...state,
                comments
            })
        case UPDATE_COMMENT:
            var newState = { ...state };
            newState.comments.set(action.comment.id,action.comment)
            return newState
        case DELETE_COMMENT:
            var comments= new Map(state.comments)
            comments.delete(action.comment.id)
            return Object.assign({}, state,  {
                ...state,
                comments
            })
        case VOTE_COMMENT:
            comments= new Map(state.comments)
            var newComment= {...state.comments.get(action.comment.id)}
            newComment.voteScore = action.newVote
            comments.set(newComment.id,newComment)
            return Object.assign({}, state,  {
                ...state,
                comments
            })
        default:
            return state
    }
}