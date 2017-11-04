/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import {
     createPost, fetchPosts,
} from '../actions/post'
import {connect} from "react-redux";
import * as ReadableAPI from "../utils/ReadableAPI";
import {Link} from "react-router-dom";
import PostForm from "./PostForm";
import Post from "./Post";



export class ListPosts extends Component {

    constructor(props) {
        super(props)
        this.state= {
            sortMethods: ['voteScore', 'timestamp'],
            sortMethod: 'voteScore',
            categories: ['all'],
            selectedCategory: 'all',
        }
        this.handleSelectCategory = this.handleSelectCategory.bind(this)
    }
    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories: [...this.state.categories, ...categories ] })})
        this.props.fetchPosts()
    }

    handleSelectCategory(nextCategory) {
        this.props.select(nextCategory)

    }
    createPost(post)
    {
        this.setState({editFormOpen:false})
        this.props.create(post)
    }

    render() {
        const posts = Array.from(this.props.posts.values())
        return (
            <div>
                <div className="top-bar">
                    {this.state.categories.map((category) => (
                        //ToDo: Link to route /:category
                        <Link
                            to=""
                            onClick={() => this.setState({selectedCategory: category})}
                            key={category}
                            className="top-bar-item"  >
                            {category}
                        </Link>
                    ))}
                    <label for="sort" className="top-bar-item">sort by:</label>
                    <select
                        id="sort"
                        className="top-bar-item"
                        placeholder="sortMethod"
                        name="sortMethod"
                        onChange={(event)=> {this.setState(
                            {
                                sortMethod: event.target.value
                            }
                        )}}
                        value={this.state.sortMethod}>
                        {this.state.sortMethods.map(option => (
                            <option
                                value={option}
                                key={option}
                                defaultValue={this.state.sortMethod}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='list-posts'>
                    <ul className='post-list'>
                        {posts.filter((post)=>{
                            return 'all' === this.state.selectedCategory || this.state.selectedCategory === post.category
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
                                    onSubmit={(post)=>this.createPost(post)}
                                />
                            </div>:
                            <Link
                                to=''
                                onClick={()=>{this.setState({editFormOpen:true})}}>
                                Add post
                            </Link>}
                    </div>
                </div>
            </div>
        )
    }


}

/*ListPosts.propTypes = {
    posts: PropTypes.array.isRequired,
}*/

function mapDispatchToProps (dispatch) {
    return {
        create: (post) => dispatch(createPost(post)),
        fetchPosts: (category) => dispatch(fetchPosts()),
    }
}

function mapStateToProps(state) {
    const { posts } = state
    return {
        posts
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ListPosts)