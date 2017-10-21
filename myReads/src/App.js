import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
      books : [],
  }
  getBooks()
  {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }
  componentDidMount() {
     this.getBooks()
  }
  update = (book)  => {
      BooksAPI.update(book,book.shelf).then((results) => {
          this.getBooks()
          })
  };
  render() {
    return (
      <div className="app">
          <Route path='/search' render={({ history }) => (
              <SearchBooks
                  update={this.update}
                  shelfed_books={this.state.books}
              />
          )}/>
          <Route exact path='/' render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      <div>
                          <Bookshelf
                              books={this.state.books.filter(
                                  (book)=> book.shelf==="currentlyReading"
                              )}
                              title="Currently Reading"
                              update={this.update}
                          />
                          <Bookshelf
                              books={this.state.books.filter(
                                  (book)=> book.shelf==="wantToRead"
                              )}
                              title="Want to Read"
                              update={this.update}
                          />
                          <Bookshelf
                              books={this.state.books.filter(
                                  (book)=> book.shelf==="read"
                              )}
                              title="Read"
                              update={this.update}
                          />
                      </div>
                  </div>
                  <div className="open-search">
                      <Link
                          to='/search'
                          className='add-contact'
                      >Add a book</Link>
                  </div>
              </div>
          )}/>
        )}
      </div>
    )
  }
}
export default BooksApp
