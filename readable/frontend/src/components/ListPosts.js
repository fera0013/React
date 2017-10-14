/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comments from './Comments'
import {
    selectCategory,
    fetchPostsIfNeeded,
    removePost
} from '../actions/post'
import {
    selectPost
} from '../actions/comments'
import {Link, Route} from "react-router-dom";
import Picker from "./Picker";
import {dispatch} from "redux";
import {connect} from "react-redux";
import * as ReadableAPI from "../utils/ReadableAPI";
import CommentForm from "./CommentForm";

export class ListPosts extends Component {
    state={
        sortMethods:['voteScore','timestamp'],
        sortMethod: 'voteScore',
        categories:['all']
    }
    constructor(props) {
        super(props)
        this.handleSelectCategory = this.handleSelectCategory.bind(this)
    }
    fetchPosts(){
        const { selectedCategory } = this.props
        this.props.dispatch(fetchPostsIfNeeded(selectedCategory))
    }
    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
       this.fetchPosts()
    }
    componentDidUpdate() {
        this.fetchPosts()
    }

    handleSelectPost(nextPost) {
        this.props.dispatch(selectPost(nextPost))
    }
    onDeletePost(post) {
        this.props.dispatch(removePost(post.id))
    }
    handleSelectCategory(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))

    }
    render() {
        const { posts, selectedCategory} = this.props
        return (
            <div className='list-posts'>
                {this.state.categories.map((category) => (
                    <Link
                        to={`/${category}`}
                        onClick={() => this.handleSelectCategory(category)}
                        key={category}>{category}
                    </Link>
                ))}
                <Picker
                    value={this.state.sortMethod}
                    options={this.state.sortMethods}
                    onChange={(itemValue, itemIndex) => this.setState({sortMethod: itemValue})}
                />
                <ul className='post-list'>
                    {posts.filter((post)=>{
                        return 'all' === this.props.selectedCategory || this.props.selectedCategory === post.category
                    }).sort((post_1,post_2)=>{
                        return post_1[this.state.sortMethod]<post_2[this.state.sortMethod]
                    }).map((post) =>{
                        return(
                            <li key={post.id} className='post-list-item'>
                                <div className='post-details'>
                                    <h3>{post.title}</h3>
                                    <p>{post.category}</p>
                                    <p>{post.author}</p>
                                    <p>{post.body}</p>
                                    <p>{post.voteScore}</p>
                                    <Link
                                        to={`/${selectedCategory}/${post.id}`}
                                        onClick={() => this.handleSelectPost(post.id)}>
                                        Show comments
                                    </Link>
                                    {this.props.match.params.post!=='undefined'&&
                                    this.props.match.params.post=== post.id &&
                                        <Comments/>}
                                    {this.props.match.params.edit!=='undefined'&&
                                    this.props.match.params.post=== post.id &&
                                    <Route exact path='/:category/:post/edit' component={CommentForm}/>}
                                </div>
                                <button onClick={() => this.onDeletePost(post)} className='post-remove'>
                                    Remove
                                </button>
                            </li>
                        )})}
                </ul>
                <div className="open-search">
                    <Link
                        to='/editPost'
                    >Create new post</Link>
                </div>
            </div>
        )
    }


}

ListPosts.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { selectedCategory, postsByCategory, selectedPost } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByCategory[selectedCategory] || {
        isFetching: true,
        items: []
    }

    return {
        selectedCategory,
        selectedPost,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(ListPosts)