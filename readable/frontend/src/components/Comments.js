/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    fetchCommentsIfNeeded,
} from '../actions/comments'
import { connect } from 'react-redux'
import * as ReadableAPI from "../utils/ReadableAPI";

export class Comments extends Component {
    updateComments(){
        const { dispatch,selectedPost} = this.props
        dispatch(fetchCommentsIfNeeded(selectedPost))
    }
    componentDidMount() {
       this.updateComments()
    }
    onDeleteComment(comment) {
        ReadableAPI.deleteComment(comment.id)
        this.updateComments()
    }
    render() {
        return (
            <ul  className='post-list'>
                {this.props.comments.map((comment) =>
                    <li key={comment.id} className='post-list-item'>
                        <div className='post-details'>
                            <p>{comment.attribute}</p>
                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{comment.voteScore}</p>
                        </div>
                        <button onClick={() => this.onDeleteComment(comment)} className='post-remove'>
                            Remove
                        </button>
                    </li>)
                }
            </ul>
        )
    }
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

export default connect(mapStateToProps)(Comments)