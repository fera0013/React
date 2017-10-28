/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    create,
    fetchCommentsIfNeeded,
} from '../actions/comments'
import { connect } from 'react-redux'
import Comment from "./Comment";
import Link from "react-router-dom/es/Link";
import CommentForm from "./CommentForm";
import Modal from 'react-modal';


export class ListComments extends Component {
    state={
        editFormOpen:false
    }
    updateComments(){
       this.props.fetchComments(this.props.post.id)
    }
    componentDidMount() {
       this.updateComments()
    }
    createComment(comment)
    {
        this.setState({editFormOpen:false})
        this.props.create(comment)
    }
    render() {
        return (
            <div className='list-posts'>
                <ul  className='post-list'>
                    {this.props.comments.map((comment) =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    )}
                </ul>
                <div>
                    {this.state.editFormOpen?
                        <div>
                            <Link
                                to=''
                                onClick={()=>{this.setState({editFormOpen:false})}}>
                                Close
                            </Link>
                            <CommentForm
                                onSubmit={(comment)=>this.createComment(comment)}
                                post_id={this.props.post.id}
                            />
                        </div>:
                        <Link
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Create comment
                        </Link>}
                </div>
            </div>

        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        create: (comment) => dispatch(create(comment)),
        fetchComments: (post_id) => dispatch(fetchCommentsIfNeeded(post_id))
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

export default connect(mapStateToProps,mapDispatchToProps)(ListComments)