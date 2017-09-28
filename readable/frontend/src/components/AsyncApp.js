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
} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
import * as ReadableAPI from "../utils/ReadableAPI";




class AsyncApp extends Component {
    state={
        categories:['all']
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch, selectedCategory } = this.props
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

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch, selectedCategory } = this.props
        dispatch(invalidateCategory(selectedCategory ))
        dispatch(fetchPostsIfNeeded(selectedCategory ))
    }

    render() {
        console.log(this.props.posts)
        const { selectedCategory, posts, isFetching, lastUpdated } = this.props
        return (
            <div>
                <Picker
                    value={selectedCategory}
                    onChange={this.handleChange}
                    options={this.state.categories}
                />
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>}
                    {!isFetching &&
                    <a href="#" onClick={this.handleRefreshClick}>
                        Refresh
                    </a>}
                </p>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
                {posts.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts.filter((post)=>{
                        return 'all' === this.props.selectedCategory || this.props.selectedCategory === post.category
                    })} />
                </div>}
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