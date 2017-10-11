/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import Picker from "./Picker";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            post:{
                attribute:"",
                id:"",
                timestamp:"",
                title:"",
                body:"",
                author:"",
                category:"",
                voteScore:1,
                deleted: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
    }

    handleChange(event) {
        let target=event.target
        let new_post = this.state.post
        new_post[target.name]=target.value
        this.setState({post:new_post})
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        Date.now()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label for="attribute"> Attribute: </label>
                <input id="attribute" name="attribute" type="text" value={this.state.post.attribute} onChange={this.handleChange}/>
                <br/>
                <label for="title">title:</label>
                <input id="title" name="title" type="text" value={this.state.post.title}  onChange={this.handleChange}/>
                <br/>
                <label for="body">body:</label>
                <textarea id="body" name="body" value={this.state.post.body} onChange={this.handleChange}/>
                <br/>
                <label for="author">  author:  </label>
                <input id="author" name="author" type="text" value={this.state.post.author}  onChange={this.handleChange}/>
                <br/>
                <label for="category">Category:</label>
                 <select id="category" name="category" onChange={this.handleChange}  value={this.state.post.category}>
                  {this.state.categories.map(option => (
                      <option value={option} key={option}>
                          {option}
                      </option>
                  ))}
                 </select>
                <br/>
                <label for="score"> Vote: </label>
                <input id="score" name="voteScore"  type="text" value={this.state.voteScore} onChange={this.handleChange} />
            </form>
        );
    }
}

export default PostForm