/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    fetchCommentsIfNeeded,
} from '../actions/comments'
import { connect } from 'react-redux'
import Comment from "./Comment";


export class ListComments extends Component {
    updateComments(){
        const { dispatch} = this.props
        dispatch(fetchCommentsIfNeeded(this.props.post.id))
        console.log("comments:" + this.props.comments)
    }
    componentDidMount() {
       this.updateComments()
    }
    render() {
        return (
            <div className='list-posts'>
                <ul  className='post-list'>
                    {this.props.comments.map((comment) =>
                        <Comment
                            comment={comment}
                        />
                    )}
                </ul>
            </div>
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

export default connect(mapStateToProps)(ListComments)