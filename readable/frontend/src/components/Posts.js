/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

export default class Posts extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.posts.map((post, i) => <li key={i}>{post.title}</li>)}
                </ul>
                {this.props.posts.length > 0 &&
                    <Post post_id={this.props.posts[0].id}/>
                }
            </div>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}