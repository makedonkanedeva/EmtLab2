import './App.css';
import {
    Routes,
    Navigate,
    Route
} from 'react-router-dom';
import {Component} from "react";
import Header from "../Header/header";
import Countries from "../Country/country";
import Authors from "../Author/author";
import Categories from "../Category/category";
import Books from "../Books/BookList/books";
import BookAdd from "../Books/BookAdd/BookAdd";
import BookEdit from "../Books/BookEdit/BookEdit";
import LibraryService from "../../repository/libraryRepository";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            authors: [],
            books: [],
            categories: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <main>
                <Header/>
                <div className="container">
                    <Routes>
                        <Route path="/country" exact element={<Countries countries={this.state.countries}/>}/>
                        <Route path="/author" exact element={<Authors authors={this.state.authors}/>}/>
                        <Route path="/category" exact element={<Categories categories={this.state.categories}/>}/>
                        <Route path="/books/add" exact element={<BookAdd categories={this.state.categories}
                                                                         authors={this.state.authors}
                                                                         onAddBook={this.addBook}/>}/>
                        <Route path="/books/edit/:id" exact element={<BookEdit categories={this.state.categories}
                                                                               authors={this.state.authors}
                                                                               onEditBook={this.editBook}
                                                                               book={this.state.selectedBook}/>}/>
                        <Route path="/books" exact element={<Books books={this.state.books}
                                                                    onDelete={this.deleteBook}
                                                                    markAsTaken={this.markAsTaken}
                                                                    onEdit={this.getBook}/>}/>
                        <Route path="/" element={<Navigate to={"/books"}/>}/>
                    </Routes>
                </div>
            </main>
        )
    }

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data)=>{
                this.setState({
                    authors: data.data
                })
            });
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data)=>{
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data)=>{
                this.setState({
                    categories: data.data
                })
            })
    }

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
               this.loadBooks();
            });
    }

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    markAsTaken = (id) => {
        LibraryService.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            });
    }

    componentDidMount() {
        this.loadCountries();
        this.loadAuthors();
        this.loadBooks();
        this.loadCategories();
    }


}

export default App;
