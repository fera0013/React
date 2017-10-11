import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../utils/configureStore'
import AsyncApp from './App'
import {BrowserRouter} from "react-router-dom";

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AsyncApp />
                </BrowserRouter>
            </Provider>
        )
    }
}