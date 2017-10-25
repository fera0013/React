/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    selectCategory,
    fetchPostsIfNeeded, createPost,
} from '../actions/post'
import Picker from "./Picker";
import {connect} from "react-redux";
import * as ReadableAPI from "../utils/ReadableAPI";
import {Link} from "react-router-dom";
import PostForm from "./PostForm";
import Post from "./Post";



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
        this.createPost = this.createPost.bind(this)
    }
    fetchPosts(){
        const { selectedCategory } = this.props
        this.props.fetchPostsIfNeeded(selectedCategory)
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
        this.props.select(nextCategory)

    }
    createPost(post)
    {
        this.props.add(post)
    }


    render() {
        const { posts} = this.props
        return (
            <div className='list-posts'>
                {this.state.categories.map((category) => (
                    //ToDo: Link to route /:category
                    <Link key={category} to="">
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
                             key={post.id}
                             post={post}
                         />
                        )})}
                </ul>
                <div>
                    {this.state.editFormOpen?
                        <div>
                            <Link
                                to=''
                                onClick={()=>{this.setState({editFormOpen:false})}}>
                                Close
                            </Link>
                            <PostForm
                                onSubmit={this.createPost}
                            />
                        </div>:
                        <Link
                            to=''
                            onClick={()=>{this.setState({editFormOpen:true})}}>
                            Add post
                        </Link>}
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
}

function mapDispatchToProps (dispatch) {
    return {
        add: (post) => dispatch(createPost(post)),
        fetchPostsIfNeeded: (category) => dispatch(fetchPostsIfNeeded(category)),
        select: (category) => dispatch(selectCategory(category))
    }
}

function mapStateToProps(state) {
    const { selectedCategory, postsByCategory } = state
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
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListPosts)