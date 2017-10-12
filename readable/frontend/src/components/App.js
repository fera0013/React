/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import Posts from './Posts'
import {Link, Route} from "react-router-dom";
import {connect} from "react-redux";
import {
    selectCategory,
} from '../actions/post'
import * as ReadableAPI from "../utils/ReadableAPI";
import PostForm from "./PostForm";


class AsyncApp extends Component {
    state={
        categories:['all']
    }
    constructor(props) {
        super(props)
        this.handleSelectCategory = this.handleSelectCategory.bind(this)
    }
    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
    }
    handleSelectCategory(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory))

    }
    render() {
        return (
            <div>
                {this.state.categories.map((category) => (
                    <Link
                        to={`/${category}`}
                        onClick={() => this.handleSelectCategory(category)}
                        key={category}>{category}
                    </Link>
                ))}
                <Route exact path='/:category' render={() => (
                    <Posts/>
                )}/>
                <Route exact path='/edit' render={() => (
                    <PostForm/>
                )}/>
                <div className="open-search">
                    <Link
                        to='/edit'
                        className='add-contact'
                    >Create new post</Link>
                </div>
            </div>
        )
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

export default connect(mapStateToProps)(AsyncApp)