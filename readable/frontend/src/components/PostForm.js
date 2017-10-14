/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import * as ReadableAPI from "../utils/ReadableAPI";
import v1 from 'uuid/v1';
import {
    fetchPostsIfNeeded
} from '../actions/post'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

class PostForm extends React.Component {
    state = {
        categories:[],
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
        }
    }
    constructor(props) {
        super(props);
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
            <div>
                <Link className='close-create-contact' to='/'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-post-form'>
                    <div className='create-post-details'>
                        <input  name="attribute" type="text" placeholder="attribute" value={this.state.post.attribute} onChange={this.handleChange}/>
                        <input placeholder="title" name="title" type="text" value={this.state.post.title}  onChange={this.handleChange}/>
                        <textarea placeholder="body" name="body" value={this.state.post.body} onChange={this.handleChange}/>
                        <input placeholder="author" name="author" type="text" value={this.state.post.author}  onChange={this.handleChange}/>
                         <select placeholder="category" name="category" onChange={this.handleChange}  value={this.state.post.category}>
                          {this.state.categories.map(option => (
                              <option value={option} key={option}>
                                  {option}
                              </option>
                          ))}
                         </select>
                        <input placeholder="score" name="voteScore"  type="text" value={this.state.voteScore} onChange={this.handleChange} />
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

PostForm.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(PostForm)