/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {Vote} from "./Vote";
import {downVote, removeComment, update, upVote} from "../actions/comments";
import Link from "react-router-dom/es/Link";
import CommentForm from "./CommentForm";
import {connect} from "react-redux";

class Comment extends Component {
    state={
        editFormOpen:false
    }
    render() {
        return(
            <li key={this.props.comment.id} className='post-list-item'>
                <div className='post-details'>
                    <p>{this.props.comment.attribute}</p>
                    <p>{this.props.comment.body}</p>
                    <p>{this.props.comment.author}</p>
                    <Vote
                        element={this.props.comment}
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
                            <CommentForm
                                onSubmit={this.props.update}
                                comment={this.props.comment}
                            />
                        </div>:
                        <Link
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Edit comment
                        </Link>}
                </div>
                <button onClick={() => this.props.remove(this.props.comment)} className='post-remove'>
                    Delete
                </button>
            </li>
        )
    }
}




function mapDispatchToProps (dispatch) {
    return {
        upVote: (comment_id) =>dispatch(upVote(comment_id)),
        downVote: (comment_id) =>dispatch(downVote(comment_id)),
        update: (comment) =>dispatch(update(comment)),
        delete: (comment)=>dispatch(removeComment(comment.id))
    }
}
export default connect(null,mapDispatchToProps)(Comment)

