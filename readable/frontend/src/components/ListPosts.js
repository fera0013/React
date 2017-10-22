/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    selectCategory,
    fetchPostsIfNeeded,
} from '../actions/post'
import Picker from "./Picker";
import {connect} from "react-redux";
import * as ReadableAPI from "../utils/ReadableAPI";
import {Link} from "react-router-dom";
import PostForm from "./PostForm";
import Post from "./Post";
import Modal from 'react-modal';
import v1 from 'uuid/v1';
import {createPost} from "../utils/ReadableAPI";

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
        this.handleCreatePost = this.handleCreatePost.bind(this)
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

    handleSelectCategory(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))

    }
    handleCreatePost(post){
        post.id= v1()
        post.timestamp=Date.now()
        this.props.dispatch(createPost(post))
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
                         <Post
                             post={post}
                         />
                        )})}
                </ul>
                <div>
                    <Link
                        className='close-create-contact'
                        to=''
                        onClick={()=>{this.setState({editFormOpen:true})}}>
                        Add post
                    </Link>
                    <Modal
                        isOpen={this.state.editFormOpen}
                        contentLabel="Edit Post"
                    >
                       <PostForm
                           onSubmit={this.handleCreatePost}
                       />
                        <button onClick={()=>{this.setState({editFormOpen:false})}}>close</button>
                    </Modal>
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