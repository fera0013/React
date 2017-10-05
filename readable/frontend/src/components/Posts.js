/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'
import * as ReadableAPI from "../utils/ReadableAPI";
import {
    selectCategory,
    fetchPostsIfNeeded,
    invalidateCategory
} from '../actions/post'
import {Link} from "react-router-dom";
import Picker from "./Picker";
import {dispatch} from "redux";
import {connect} from "react-redux";

export class Posts extends Component {
    state={
        sortMethods:['voteScore','timestamp'],
        sortMethod: 'voteScore',
        categories:['all']
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        const { selectedCategory } = this.props
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
        this.props.dispatch(fetchPostsIfNeeded(selectedCategory))
    }
    handleChange(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))
        this.props.dispatch(fetchPostsIfNeeded(nextCategory))
    }

    render() {
        const { posts } = this.props
        return (
            <div>
                {this.state.categories.map((category) => (
                    <Link
                        to={`/${category}`}
                        onClick={() => this.handleChange(category)}
                        key={category}>{category}
                    </Link>
                ))}
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
                    }).map((post, i) => <li key={i}>{post.title}</li>)}
                </ul>
                {this.props.posts.length > 0 &&
                    <Post post_id={this.props.posts[0].id}/>
                }
                <div className="open-search">
                    <Link
                        to='/create'
                        className='add-contact'
                    >Add a post</Link>
                </div>
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

export default connect(mapStateToProps)(Posts)