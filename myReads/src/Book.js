import React from 'react';

function Book(props){
    return (

            <div className="book" key={props.book.id}>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={'shelf' in props.book? props.book.shelf : "none"}
                            onChange={
                                (event)=>{
                                    props.book.shelf=event.target.value
                                    props.update(props.book)
                                }
                            }>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors}</div>
            </div>
    )
}

export default Book
