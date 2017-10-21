/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import ListComments from './ListComments'
import {
    removePost
} from '../actions/post'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {selectPost} from "../actions/comments";
import CommentForm from "./CommentForm";
import {Vote} from "./Vote";
import * as ReadableAPI from "../utils/ReadableAPI";

export class Post extends Component {
    constructor(props) {
        super(props)
        this.onDeletePost = this.onDeletePost.bind(this)
    }
    onDeletePost(post_id) {
        this.props.dispatch(removePost(post_id))
    }
    render() {
        const { post } = this.props
        return (
            <li key={post.id} className='post-list-item'>
                <div className='post-details'>
                    <h3>{post.title}</h3>
                    <p>{post.category}</p>
                    <p>{post.author}</p>
                    <p>{post.body}</p>
                    <Vote
                        element={post}
                        voteUp = {ReadableAPI.upVotePost}
                        voteDown = {ReadableAPI.downVotePost}
                    />
                    <ListComments
                        post={post}
                    />
                </div>
                <button onClick={() => this.onDeletePost(post)} className='post-remove'>
                    Remove
                </button>
            </li>
        )
    }


}

Post.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { selectedPost, commentsByPost } = state
    const {
        isFetching,
        lastUpdated,
        items: comments
    } = commentsByPost[selectedPost] || {
        isFetching: true,
        items: []
    }

    return {
        selectedPost,
        comments,
        isFetching,
        lastUpdated
    }
}


export default connect(mapStateToProps)(Post)