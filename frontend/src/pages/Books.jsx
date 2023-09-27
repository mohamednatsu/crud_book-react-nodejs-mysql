import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/book.module.css'
import { imgs } from '../imgs/data';


const Books = () => {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchAllBooks();
    }, []);

    //to handle delete function
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/delete/${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className={styles.app}>
            <h1 style={{ fontSize: '50px' }}>Mangas</h1>
            <div className={styles.books}>{
                books.map((book) => (
                    <div key={book.id} className={styles.book}>
                        <div className="">
                            {
                                imgs.map((img) => (
                                    book.cover == img.name ?
                                        <img key={img.id} src={img.png} />
                                        : console.log(book.cover == img.name)
                                ))
                            }
                        </div>
                        <div className="" style={{ padding: '10px' }}>
                            <h2 style={{ fontSize: '29px' }}>{book.title}</h2>
                            <p style={{ color: '#000' }}>{book.description}</p>
                            <h3 style={{ color: '#000' }}>Price : {book.price == 0 ? book.price = 200 : book.price}$</h3>
                        </div>
                        <div className={styles.options}>
                            <Link to={"/update/"+book.id}>
                                <div className={styles.edit}>Edit</div>
                            </Link>
                            <Link onClick={() => handleDelete(book.id)} to={'/'}>
                                <div className={styles.delete}>Delete</div>
                            </Link>
                        </div>
                    </div>
                ))
            }
            </div>
            <button className={styles.btn}>
                <Link className={styles.link} to="/add">
                    Add New Manga
                </Link>
            </button>
        </div>
    )
}

export default Books