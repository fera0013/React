import React from 'react';
import Book from "./Book";

function Bookshelf(props){
    let update = (book)=>{
        props.update(book)
    }
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.title}</h2>
          <div className="bookshelf-books">
            <div className="books-grid">
                {props.books.map((book) => (
                    <Book
                        book={book}
                        update={update}
                    />
                ))}
            </div>
          </div>
        </div>
    )
}

export default Bookshelf
