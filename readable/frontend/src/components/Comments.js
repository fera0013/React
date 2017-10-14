/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    fetchCommentsIfNeeded,
} from '../actions/comments'
import { connect } from 'react-redux'
import * as ReadableAPI from "../utils/ReadableAPI";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router'


export class Comments extends Component {
    constructor(props) {
        super(props)
    }
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
        //ToDo: Check why this.props.match is undefined here
        const category =window.location.href.split('/')[3]
        const post_id = window.location.href.split('/')[4]
        return (

            <div className='list-posts'>
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
                <div className="open-search">
                    <Link to={`/${category}/${post_id}/edit`}>add comment</Link>
                </div>
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

export default connect(mapStateToProps)(Comments)