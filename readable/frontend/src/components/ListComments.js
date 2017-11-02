/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
    create,
    fetchComments,
} from '../actions/comments'
import { connect } from 'react-redux'
import Comment from "./Comment";
import Link from "react-router-dom/es/Link";
import CommentForm from "./CommentForm";


export class ListComments extends Component {
    state={
        editFormOpen:false
    }
    componentDidMount() {
        this.props.fetchComments(this.props.post.id)
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
                    {this.props.comments.hasOwnProperty(this.props.post.id)&&
                    this.props.comments[this.props.post.id].
                        filter((comment)=>{return comment.parentId===this.props.post.id}).
                    map((comment) =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />)
                    }
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
        fetchComments: (post_id) => dispatch(fetchComments(post_id))
    }
}


function mapStateToProps(state) {
    const {comments} = state
    return {
        comments
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListComments)