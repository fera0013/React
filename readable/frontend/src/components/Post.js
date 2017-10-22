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
import Modal from 'react-modal';
import {Vote} from "./Vote";
import * as ReadableAPI from "../utils/ReadableAPI";
import PostForm from "./PostForm";

export class Post extends Component {
    state={
        showComments:false
    }
    constructor(props) {
        super(props)
        this.onDeletePost = this.onDeletePost.bind(this)
    }
    onDeletePost(post) {
        this.props.dispatch(removePost(post))
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
                    <Link
                        className='close-create-contact'
                        to=''
                        onClick={()=>{this.setState({editFormOpen:true})}}>
                        Edit post
                    </Link>
                    <Modal
                        isOpen={this.state.editFormOpen}
                        contentLabel="Edit Post"
                    >
                        <PostForm
                            post={post}
                        />
                        <button onClick={()=>{this.setState({editFormOpen:false})}}>close</button>
                    </Modal>
                    {this.state.showComments ?
                        <div>
                            <Link
                                className='close-create-contact'
                                to=''
                                onClick={()=>{this.setState({showComments:false})}}>
                                Hide comments
                            </Link>
                            <ListComments
                                post={post}
                            />
                        </div>
                        :
                        <Link
                            to=''
                            onClick={()=>{this.setState({showComments:true})}}>
                            Show comments
                        </Link>
                    }
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