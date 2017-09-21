import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../ReadableAPI';
import Posts from "./Posts";
import { Link ,Route } from 'react-router-dom';


class App extends Component {
    state = {
        categories: []
    }
    componentDidMount() {
        ReadableAPI.getAllCategories().then((categories) => {
            this.setState({ categories })
        })
    }
    render() {
        console.log(this.state.categories)
        return (
            <div className='container'>
                <div className='nav'>
                    <h1 className='header'>Readable</h1>
                </div>
                {this.state.categories.map((category) => (
                    <div>{category.name}</div>
                ))}
                <Posts/>
            </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)