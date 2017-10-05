/**
 * Created by z0017fjy on 26.09.2017.
 */
import React, { Component } from 'react'
import Posts from '../components/Posts'
import {Route} from "react-router-dom";




class AsyncApp extends Component {
    render() {
        return (
            <div>
                <Route  path='/' render={() => (
                    <Posts/>
                )}/>
                <Route exact path='/:create' render={() => (
                    <div>
                       Create
                    </div>
                )}/>
            </div>
        )
    }
}


export default AsyncApp