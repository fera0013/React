/**
 * Created by z0017fjy on 14.10.2017.
 */
import React from 'react';

export class Vote extends React.Component {
    constructor() {
        super();

        this.state = {
            score: 0,
        };

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    componentDidMount() {
        this.setState({score:this.props.element.voteScore})
    }


    render() {
        return (
            <div className="vote-score">
                <button className="countDown" onClick={this.decrement}>-</button>
                <div>{this.state.score}</div>
                <button className="countUp" onClick={this.increment}>+</button>
            </div>
        );
    }


    increment() {
        let prev_score = this.state.score
        this.setState({
            score: this.state.score + 1,
        });
        this.props.onUpdate(this.props.element.id,prev_score,this.state.score)
    }

    decrement() {
        let prev_score = this.state.score
        this.setState({
            score: this.state.score - 1,
        });
        this.props.onUpdate(this.props.element.id,prev_score,this.state.score)
    }
}