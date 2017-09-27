/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
    render() {
        return (
            <ul>
                {this.props.posts.map((post, i) => <li key={i}>{post.title}</li>)}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}