import React from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp'
import EachBook from './EachBook.js'

class Search extends React.Component {

  state={
    query: ''
  }

  updataQuery = (query) => {
    this.setState({ query:query.trim() });
  }

  render() {

    let showingBooks;

    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query),'i');
      showingBooks = this.props.books.filter(
        book => match.test(book.title) || match.test(book.authors));
    } else {
      showingBooks = this.props.books;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
          to="/"
          className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(e) => this.updataQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map( book =>
              <EachBook onShelfUpdate={this.props.onShelfUpdate} key={book.id} book={book} />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
