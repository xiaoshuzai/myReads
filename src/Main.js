import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf.js'

class Main extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
          <div className="list-books-content">
            <div>

              <BookShelf
              onShelfUpdate={this.props.onShelfUpdate}
              title="Currently Reading"
              books={ this.props.books.filter( book =>  book.shelf === "currentlyReading" )}
              />

              <BookShelf
              onShelfUpdate={this.props.onShelfUpdate}
              title="Want to Read"
              books={ this.props.books.filter( book =>  book.shelf === "wantToRead" )}
              />

              <BookShelf
              onShelfUpdate={this.props.onShelfUpdate}
              title="read"
              books={ this.props.books.filter( book =>  book.shelf === "read" )}
              />

            </div>
          </div>
        <div className="open-search">
          <Link
          to="/search"
          >Add a book</Link>
        </div>
      </div>
    )}
  }


export default Main;
