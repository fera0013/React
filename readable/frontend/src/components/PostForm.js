/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import {createPost} from "../actions/post";
import {v1} from "uuid";
import {connect} from "react-redux";


class PostForm extends React.Component {
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
                voteScore:"1",
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

    handleSubmit(e){
        e.preventDefault()
        let new_post = this.state.post
        new_post.id= v1()
        new_post.timestamp=Date.now()
        this.props.create(new_post)
    }

    render() {
        const post = this.state.post;
        return (
            <div>
                <form  onSubmit={this.handleSubmit} className='create-post-form'>
                    <div className='create-post-details'>
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
                        <br/>
                        <button>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        create: (post) => dispatch(createPost(post)),
    }
}

export default connect(
   null,
    mapDispatchToProps
)(PostForm)