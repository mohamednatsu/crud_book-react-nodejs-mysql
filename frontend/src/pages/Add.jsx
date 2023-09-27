import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import styles from '../styles/add.module.css'

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/books/add", book)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.form}>
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title" />
            <input type="text" placeholder="Description" onChange={handleChange} name="description" />
            <input type="number" placeholder="Price" onChange={handleChange} name="price" />
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover" />

            <button className={styles.btn} onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add