/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import v1 from 'uuid/v1';
import {dispatch} from "redux";
import {
    fetchPostsIfNeeded
} from '../actions/post'
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            post:{
                attribute:"attribute",
                id:"id",
                timestamp:"timestamp",
                title:"title",
                body:"body",
                author:"author",
                category:"category",
                voteScore:"1",
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
        event.preventDefault();
        let new_post = this.state.post
        new_post.id= v1()
        new_post.timestamp=Date.now()
        ReadableAPI.createPost(new_post)
        this.props.dispatch(fetchPostsIfNeeded(new_post.category))
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
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

PostForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(PostForm)