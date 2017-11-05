/**
 * Created by z0017fjy on 11.10.2017.
 */
import React from 'react'
import v1 from 'uuid/v1';


export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //ToDo: Create comment class
            comment:{
                attribute:"",
                id:"",
                parentId:"",
                timestamp:"",
                body:"",
                author:"",
                voteScore:"1",
                deleted: false
            }}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.comment!==undefined)
        {
            this.setState({comment: this.props.comment})
        }
        else
        {
            const newComment =  this.state.comment
            newComment.parentId=this.props.post_id
            this.setState({comment:newComment})
        }
    }

    handleChange(event) {
        let target=event.target
        let new_comment = this.state.comment
        new_comment[target.name]=target.value
        this.setState({comment:new_comment})
    }

    handleSubmit(event) {
        event.preventDefault();
        let new_comment = this.state.comment
        if(this.props.comment===undefined)
        {
            new_comment.id= v1()
        }
        new_comment.timestamp=Date.now()
        this.props.onSubmit(new_comment)
    }

    render() {
        const comment = this.state.comment;
        return (
            <form onSubmit={this.handleSubmit} className='create-post-form'>
                <div className='create-post-details'>
                    <textarea placeholder="body" name="body" value={comment.body} onChange={this.handleChange}/>
                    <input placeholder="author" name="author" type="text" value={comment.author}  onChange={this.handleChange}/>
                    <button>Submit</button>
                </div>
            </form>
        );
    }
}

