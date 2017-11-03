/**
 * Created by z0017fjy on 14.10.2017.
 */
import React from 'react';

export class Vote extends React.Component {


    render() {
        const {element,onDownVote,onUpVote} = this.props
        return (
            <div className="vote-score">
                <button className="countDown" onClick={()=>{ onDownVote(element)}}>-</button>
                <div>{element.voteScore}</div>
                <button className="countUp" onClick={()=>{ onUpVote(element)}}>+</button>
            </div>
        );
    }
}

