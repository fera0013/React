/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comments from './ListComments'
import {
    selectCategory,
    fetchPostsIfNeeded,
    removePost
} from '../actions/post'
import Picker from "./Picker";
import {connect} from "react-redux";
import * as ReadableAPI from "../utils/ReadableAPI";
import CommentForm from "./CommentForm";
import {Vote} from "./Vote";
import {Link} from "react-router-dom";
import PostForm from "./PostForm";

export class ListPosts extends Component {
    state={
        sortMethods:['voteScore','timestamp'],
        sortMethod: 'voteScore',
        categories:['all'],
        editFormOpen:false
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

    onDeletePost(post) {
        this.props.dispatch(removePost(post.id))
    }
    handleSelectCategory(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))

    }
    render() {
        const { posts} = this.props
        return (
            <div className='list-posts'>
                {this.state.categories.map((category) => (
                    //ToDo: Link to route /:category
                    <Link to="">
                        <button onClick={() => this.handleSelectCategory(category)} key={category}>
                            {category}
                        </button>
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
                                    <Vote
                                        element={post}
                                        voteUp = {ReadableAPI.upVotePost}
                                        voteDown = {ReadableAPI.downVotePost}
                                    />
                                    <Comments
                                        post={post}
                                    />
                                    <CommentForm/>
                                </div>
                                <button onClick={() => this.onDeletePost(post)} className='post-remove'>
                                    Remove
                                </button>
                            </li>
                        )})}
                </ul>
                <div>
                    {this.state.editFormOpen ?
                        <div>
                            <Link
                                className='close-create-contact'
                                to=''
                                onClick={()=>{this.setState({editFormOpen:false})}}>
                                Close
                            </Link>
                            <PostForm/>
                        </div>
                            :
                        <Link
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Create new post
                        </Link>
                    }
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