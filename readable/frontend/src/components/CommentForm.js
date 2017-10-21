/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import v1 from 'uuid/v1';
import {Link} from "react-router-dom";


export default class CommentForm extends React.Component {
    state = {
    comment:{
        attribute:"",
        id:"",
        parentId:"",
        timestamp:"",
        body:"",
        author:"",
        voteScore:"",
        deleted: false
    }}
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        let target=event.target
        let new_comment = this.state.comment
        new_comment[target.name]=target.value
        this.setState({comment:new_comment})
    }

    handleSubmit(event) {
        //ToDo: Check why this.props.match is undefined here
        const post_id = window.location.href.split('/')[4]
        event.preventDefault();
        let new_comment = this.state.comment
        new_comment.id= v1()
        new_comment.timestamp=Date.now()
        new_comment.parentId= post_id
        ReadableAPI.addComment(new_comment)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='create-post-form'>
                <div className='create-post-details'>
                    <input  name="attribute" type="text" placeholder="attribute" value={this.state.comment.attribute} onChange={this.handleChange}/>
                    <input placeholder="title" name="title" type="text" value={this.state.comment.title}  onChange={this.handleChange}/>
                    <textarea placeholder="body" name="body" value={this.state.comment.body} onChange={this.handleChange}/>
                    <input placeholder="author" name="author" type="text" value={this.state.comment.author}  onChange={this.handleChange}/>
                    <input placeholder="score" name="voteScore"  type="text" value={this.state.comment.voteScore} onChange={this.handleChange} />
                    <button>Submit</button>
                </div>
            </form>
        );
    }
}

