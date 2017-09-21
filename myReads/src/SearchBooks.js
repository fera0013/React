/**
 * Created by z0017fjy on 13.09.2017.
 */
import React, { Component } from 'react';
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import {Link} from "react-router-dom";

class SearchBooks extends Component {

    state = {
        found_books: [],
        query:''
    }
    /**
     * TODO: Refactor to a more declarative style
     */
    mergeBookLists =  ()=>{
        let merged_book_list=this.state.found_books
        for(let i=0;i< merged_book_list.length;i++)
        {
            for(let j=0;j<this.props.shelfed_books.length;j++)
            {
                if( merged_book_list[i].title===this.props.shelfed_books[j].title)
                {
                    merged_book_list[i]=this.props.shelfed_books[j]
                }
            }
        }
        this.setState({ found_books:  merged_book_list })
    }

    update = (book) =>{
        this.props.update(book)
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if(this.state.query!=='')
        {
            BooksAPI.search(query, 10).then((results) => {
                this.setState(state => ({
                    found_books: results
                }))
                this.mergeBookLists()
            })

        }
        else
        {
            this.setState(state => ({
                found_books: []
            }))
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                         NOTES: The search from BooksAPI is limited to a particular set of search terms.
                         You can find these search terms here:
                         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                         you don't find a specific author or title. Every search is limited by search terms.
                         */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.props.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                        {this.state.query && this.state.found_books.length>0 && (
                            <Bookshelf
                                books={this.state.found_books}
                                title="Search results"
                                update={this.update}
                            />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks