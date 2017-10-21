/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import {Vote} from "./Vote";
import {removeComment} from "../actions/comments";


export default class Comment extends Component {
    onDeleteComment(comment) {
        this.props.dispatch(removeComment(comment.id))
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
                    voteUp = {ReadableAPI.upVoteComment}
                    voteDown = {ReadableAPI.downVoteComment}
                    />
                </div>
                <button onClick={() => this.onDeleteComment(this.props.comment)} className='post-remove'>
                    Remove
                </button>
            </li>
        )
    }
}

