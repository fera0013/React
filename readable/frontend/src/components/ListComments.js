/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    fetchCommentsIfNeeded,
} from '../actions/comments'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import Comment from "./Comment";


export class ListComments extends Component {
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
    render() {
        //ToDo: Check why this.props.match is undefined here
        const category =window.location.href.split('/')[3]
        const post_id = window.location.href.split('/')[4]
        return (

            <div className='list-posts'>
                <ul  className='post-list'>
                    {this.props.comments.map((comment) =>
                        <Comment
                            comment={comment}
                        />
                    )}
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

export default connect(mapStateToProps)(ListComments)