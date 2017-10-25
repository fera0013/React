/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
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
        const { dispatch} = this.props
        dispatch(fetchCommentsIfNeeded(this.props.post.id))
    }
    componentDidMount() {
       this.updateComments()
    }
    render() {
        return (
            <div className='list-posts'>
                <ul  className='post-list'>
                    {console.log(this.props.comments)}
                    {this.props.comments.map((comment) =>
                        <Comment
                            comment={comment}
                        />
                    )}
                </ul>
                <div>
                    <div>
                        <Link
                            className='close-create-contact'
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Add Comment
                        </Link>
                        <Modal
                            isOpen={this.state.editFormOpen}
                            contentLabel="Add Comment"
                        >
                            <CommentForm/>
                            <button onClick={()=>{this.setState({editFormOpen:false})}}>close</button>
                        </Modal>
                    </div>
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