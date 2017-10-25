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
import {Vote} from "./Vote";
import * as ReadableAPI from "../utils/ReadableAPI";
import PostForm from "./PostForm";
import {fetchCommentsIfNeeded, selectPost} from "../actions/comments";

export class Post extends Component {
    constructor(props) {
        super(props)
        this.state={
            showComments:false,
            editFormOpen:false
        }
        this.onDeletePost = this.onDeletePost.bind(this)
    }
    onDeletePost(post) {
        this.props.remove(post)
    }
    handleSelectPost(post_id) {
        console.log("post"+ post_id)
        this.props.select(post_id)
        this.props.fetchCommentsIfNeeded(post_id)
        this.setState({showComments:true})
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
                        onUpdate={(id,prev_vote,new_vote)=>{prev_vote<new_vote?
                            ReadableAPI.upVotePost:
                            ReadableAPI.downVotePost}}
                    />
                    {this.state.editFormOpen?
                        <div>
                            <Link
                                to=''
                                onClick={()=>{this.setState({editFormOpen:false})}}>
                                Close
                            </Link>
                            <PostForm
                                handleSubmit={this.createPost}
                                post={post}
                            />
                        </div>:
                        <Link
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Edit post
                        </Link>}
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
                            onClick={() => this.handleSelectPost(post.id)} key={post.id}>
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


function mapDispatchToProps (dispatch) {
    return {
        /*add: (post) => dispatch(addComment(post)),*/
        fetchCommentsIfNeeded: (post_id) => dispatch(fetchCommentsIfNeeded(post_id)),
        select: (post_id) => dispatch(selectPost(post_id)),
        remove: (post) =>dispatch(removePost(post))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post)