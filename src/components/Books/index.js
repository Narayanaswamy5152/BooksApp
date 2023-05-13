import {Component} from 'react'
import {v4} from 'uuid'

import BookItem from '../BookItem'

import './index.css'

class Books extends Component {
  state = {
    booksList: [],
    titleInput: '',
    authorInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      booksList: prevState.booksList.map(eachBook => {
        if (id === eachBook.id) {
          return {...eachBook, isStarred: !eachBook.isStarred}
        }
        return eachBook
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAuthorInput = event => {
    this.setState({authorInput: event.target.value})
  }

  onAddBooks = event => {
    event.preventDefault()
    const {titleInput, authorInput} = this.state
    if (titleInput !== '' && authorInput !== '') {
      const newBook = {
        id: v4(),
        title: titleInput,
        author: authorInput,
        isStarred: false,
      }

      this.setState(prevState => ({
        booksList: [...prevState.booksList, newBook],
        titleInput: '',
        authorInput: '',
      }))
    } else if (titleInput === '' && authorInput !== '') {
      alert('Enter Book Title')
    } else if (titleInput !== '' || authorInput === '') {
      alert('Enter Author Name')
    } else if (titleInput === '' && authorInput === '') {
      alert('Enter Necessary Fields')
    }
  }

  deleteBook = bookId => {
    const {booksList} = this.state

    this.setState({
      booksList: booksList.filter(book => book.id !== bookId),
    })
  }

  getFilteredBooksList = () => {
    const {booksList, isFilterActive} = this.state

    if (isFilterActive) {
      return booksList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return booksList
  }

  render() {
    const {titleInput, isFilterActive, authorInput} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredBooksList = this.getFilteredBooksList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddBooks}>
                <h1 className="add-appointment-heading">Add Books</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="title" className="label">
                  Author
                </label>
                <input
                  type="text"
                  id="title"
                  value={authorInput}
                  onChange={this.onChangeAuthorInput}
                  className="input"
                  placeholder="Author"
                />

                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5920.jpg?w=1060&t=st=1679109965~exp=1679110565~hmac=dc310617fea05341bf25175f6c473058f967e6713b48b99eee22e1ac5b787a42"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Books List</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredBooksList.map(eachBook => (
                <BookItem
                  key={eachBook.id}
                  bookDetails={eachBook}
                  toggleIsStarred={this.toggleIsStarred}
                  deleteBook={this.deleteBook}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Books
