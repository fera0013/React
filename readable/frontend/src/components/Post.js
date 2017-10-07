/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    fetchCommentsIfNeeded,
    selectPost
} from '../actions/comments'
import { connect } from 'react-redux'

export class Post extends Component {
    componentDidMount() {
        const { dispatch,selectedPost} = this.props
        dispatch(fetchCommentsIfNeeded(selectedPost))
    }
    render() {
        return (
            <ul>
                {this.props.comments.map((comment) => <li key={comment.id}>{comment.body}</li>)}
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

export default connect(mapStateToProps)(Post)