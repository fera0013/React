/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import Posts from './ListPosts'
import {Route} from "react-router-dom";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";


class AsyncApp extends Component {
    render() {
        return (
            <div>
                <Route path='/:category?/:post?' component={Posts}/>
                <Route exact path='/editPost' component={PostForm}/>
            </div>
        )
    }
}


export default AsyncApp