/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import {
    fetchPostsIfNeeded
} from '../actions/post'
import {
    selectPost
} from '../actions/comments'
import {Link} from "react-router-dom";
import Picker from "./Picker";
import {dispatch} from "redux";
import {connect} from "react-redux";

export class Posts extends Component {
    state={
        sortMethods:['voteScore','timestamp'],
        sortMethod: 'voteScore'
    }
    fetchPosts(){
        const { selectedCategory } = this.props
        this.props.dispatch(fetchPostsIfNeeded(selectedCategory))
    }
    componentDidMount() {
       this.fetchPosts()
    }
    componentDidUpdate() {
        this.fetchPosts()
    }

    handleSelectPost(nextPost) {
        console.log(nextPost)
        this.props.dispatch(selectPost(nextPost))
    }

    render() {
        const { posts, selectedCategory, selectedPost } = this.props
        return (
            <div>

                <Picker
                    value={this.state.sortMethod}
                    options={this.state.sortMethods}
                    onChange={(itemValue, itemIndex) => this.setState({sortMethod: itemValue})}
                />
                <ul>
                    {posts.filter((post)=>{
                        return 'all' === this.props.selectedCategory || this.props.selectedCategory === post.category
                    }).sort((post_1,post_2)=>{
                        return post_1[this.state.sortMethod]<post_2[this.state.sortMethod]
                    }).map((post) =>{
                        return(
                            <div key={post.id}>
                                <Link
                                    to={`/${selectedCategory}/${post.id}`}
                                    onClick={() => this.handleSelectPost(post.id)}>
                                    {post.title}
                                </Link>
                                {selectedPost === post.id && (
                                    <Post/>)}
                            </div>
                        )})}
                </ul>
            </div>
        )
    }
}

Posts.propTypes = {
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

export default connect(mapStateToProps)(Posts)