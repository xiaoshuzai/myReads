import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './Search.js';
import Main from './Main.js';

class BooksApp extends React.Component {
  state = {
     books: [],
     searchBooks: []
  };

  componentDidMount() {
    /*不依赖于上一刻的状态，那么传入对象即可*/
    BooksAPI.getAll().then( books => this.setState({ books }))
  };

  onShelfUpdate = (book, shelf) => {
    /*如果是 none ，就是从书架中移除掉 ，*/
    if (book.shelf === 'none') {
      BooksAPI.update(book, shelf).then(() => {
        /*让这本书变为自己本身所属的 shelf ，重新回到后台数据组中*/
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.concat([ book ])
        }));
      });
    } else {
      /*如果不是要删掉，就通过后台数据中的索引找到这本书，然后改掉它的 shelf*/
      const index = this.state.books.map(( x => x.id )).indexOf(book.id)
      BooksAPI.update(book, shelf).then(() => {
        let books = this.state.books
        /*让要变换书架位置的书本改变 shelf ，变为要放置的位置的 shelf */
        books[index].shelf = shelf;
        this.setState({ books });
      });
    }
}

onBookSearch = query => {
  BooksAPI.search(query).then( books => {
    let searchBooks = books.map( book => {
      let exist = false;
      let searchBook = {};
      /*循环遍历一次，如果找到了一致的 id ，说明这本书存在了*/
      for (let i = 0; i < this.state.books.length; i++) {
        if (this.state.books[i].id === book.id) {
          exist = true;
          searchBook = this.state.books[i];
        }
      }
      if (exist) {
        /*存在就按书架也的设定，shelf在哪就在哪*/
        return searchBook;
      } else {
        /*不存在就说明 shelf 是 none ，还没决定放哪儿*/
        book.shelf = 'none';
        return book;
      }
    });
    this.setState({ searchBooks });
  })
  .catch(() => {
    /*如果获取失败了，就让这个 searchBooks 保持原样（相当于空白），不然后边程序报错，因为此程序获取不到数据*/
    this.setState({ searchBooks: [] });
  });
}

  render() {
    // console.log(JSON.stringify(this.state.books));
    /*看这个数据看得我差点眼睛都要老花...

      books.id -- 唯一 id 值，放到后边的列表中去当 key
      books.title --- 书名，后边替换掉名字硬编码部分
      books.authors --- 作者，后边替换掉名字硬编码部分
      books.imageLinks.thumbnail -- URL 地址，后边给书籍加图片 url 地址
      books.shelf -- 书板架，留来判断这本书要放到哪个架子上

    */
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main
            books={this.state.books}
            onShelfUpdate={this.onShelfUpdate}/>
          )}
        />
        <Route path="/search" render={() => (
          <Search
            books={this.state.searchBooks}
            onShelfUpdate={this.onShelfUpdate}
            onBookSearch={this.onBookSearch}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
