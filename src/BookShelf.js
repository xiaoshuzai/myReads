import React from 'react';
import EachBook from './EachBook.js'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map( book =>
              <EachBook onShelfUpdate={this.props.onShelfUpdate} key={book.id} book={book} />
            )}
          </ol>
        </div>
      </div>
      )
    }
  }


export default BookShelf;
