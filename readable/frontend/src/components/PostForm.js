/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import v1 from 'uuid/v1';
import {
    fetchPostsIfNeeded
} from '../actions/post'
import {Link} from "react-router-dom";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            //ToDo: Create post class
            post:{
                attribute:"",
                id:"",
                timestamp:"",
                title:"",
                body:"",
                author:"",
                category:"",
                voteScore:"",
                deleted: false
            },
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
        if(this.props.post!==undefined)
        {
            this.setState({post: this.props.post})
        }
        else{
            this.setState({post:{
                category: this.state.categories[0]
            }})
        }
    }

    handleChange(event) {
        let target=event.target
        let new_post = this.state.post
        new_post[target.name]=target.value
        this.setState({post:new_post})
    }

    handleSubmit(event) {
        event.preventDefault();
        let new_post = this.state.post
        new_post.id= v1()
        new_post.timestamp=Date.now()
        ReadableAPI.createPost(new_post)
        this.props.dispatch(fetchPostsIfNeeded(new_post.category))
    }

    render() {
        const post = this.state.post;
        return (
            <div>
                <form onSubmit={this.handleSubmit} className='create-post-form'>
                    <div className='create-post-details'>
                        <input  name="attribute" type="text" placeholder="attribute" value={post.attribute} onChange={this.handleChange}/>
                        <input placeholder="title" name="title" type="text" value={post.title}  onChange={this.handleChange}/>
                        <textarea placeholder="body" name="body" value={post.body} onChange={this.handleChange}/>
                        <input placeholder="author" name="author" type="text" value={post.author}  onChange={this.handleChange}/>
                         <select placeholder="category" name="category" onChange={this.handleChange}  value={post.category}>
                          {this.state.categories.map(option => (
                              <option
                                  value={option}
                                  key={option}
                                  defaultValue={post.category}
                              >
                                  {option}
                              </option>
                          ))}
                         </select>
                        <input placeholder="score" name="voteScore"  type="text" value={post.voteScore} onChange={this.handleChange} />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

