/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    selectCategory,
    fetchPostsIfNeeded,
    invalidateCategory
} from '../actions/post'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import * as ReadableAPI from "../utils/ReadableAPI";
import {Route} from "react-router-dom";
import {Post} from "./Post";




class AsyncApp extends Component {
    state={
        categories:['all'],
        sortMethods:['voteScore','timestamp'],
        sortMethod: 'voteScore'
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { dispatch, selectedCategory,posts } = this.props
        dispatch(fetchPostsIfNeeded(selectedCategory))
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedCategory !== prevProps.selectedCategory) {
            const { dispatch, selectedCategory } = this.props
            dispatch(fetchPostsIfNeeded(selectedCategory))
        }
    }

    handleChange(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))
        this.props.dispatch(fetchPostsIfNeeded(nextCategory))
    }

    handleSortMethodChange(selectedSortMethod){
        this.setState({sortMethod:selectedSortMethod})
    }

    render() {
        const { selectedCategory, posts, isFetching, lastUpdated } = this.props
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div>
                        <Picker
                            value={selectedCategory}
                            onChange={this.handleChange}
                            options={this.state.categories}
                        />
                        {posts.length > 0 &&
                        <Posts posts={posts.filter((post)=>{
                            return 'all' === this.props.selectedCategory || this.props.selectedCategory === post.category
                        }).sort((post_1,post_2)=>{
                            return post_1[this.state.sortMethod]<post_2[this.state.sortMethod]
                        })} />}
                    </div>
                )}/>
            </div>
        )
    }
}

AsyncApp.propTypes = {
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

export default connect(mapStateToProps)(AsyncApp)