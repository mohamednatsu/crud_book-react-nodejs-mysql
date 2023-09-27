import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import styles from '../styles/add.module.css'

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    })

    const navigate = useNavigate();
    const location = useLocation();

    const bookid = location.pathname.split("/")[2];
    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:8800/books/edit/"+bookid, book)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.form}>
            <h1>Edit Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title" />
            <input type="text" placeholder="Description" onChange={handleChange} name="description" />
            <input type="number" placeholder="Price" onChange={handleChange} name="price" />
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover" />
            <button className={styles.btn} onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update