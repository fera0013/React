/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import ListComments from './ListComments'
import {
    downVote,
    removePost, updatePost, upVote
} from '../actions/post'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Vote} from "./Vote";
import PostForm from "./PostForm";


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
    updatePost(post)
    {
        this.setState({editFormOpen:false})
        this.props.update(post)
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
                        onUpVote={this.props.upVote}
                        onDownVote={this.props.downVote}
                    />
                    {this.state.editFormOpen?
                        <div>
                            <Link
                                to=''
                                onClick={()=>{this.setState({editFormOpen:false})}}>
                                Close
                            </Link>
                            <PostForm
                                onSubmit={(post)=>this.updatePost(post)}
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
                            onClick={() =>  this.setState({showComments:true})}
                            key={post.id}>
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


function mapDispatchToProps (dispatch) {
    return {
        remove: (post) => dispatch(removePost(post)),
        upVote: (post) => dispatch(upVote(post)),
        downVote: (post) => dispatch(downVote(post)),
        update: (post) => dispatch(updatePost(post))
    }
}
export default connect(null,mapDispatchToProps)(Post)