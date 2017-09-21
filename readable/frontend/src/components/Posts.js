/**
 * Created by z0017fjy on 20.09.2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../ReadableAPI';



class Posts extends React.Component {


    render() {
        console.log(this.props.posts);
        return (
            <div>

            </div>
        )
    }
}


function mapStateToProps ({ posts }) {

    return {
        posts: posts,
    }
}



export default connect(
    mapStateToProps,
)(Posts)

