import React, {useEffect,useState} from 'react'
import { Router, navigate, Link } from '@reach/router'
import axios from 'axios'

const LoginComponent = props => {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    })

    const [errorState, setErrorState] = useState(null)

    const changeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.name
        })
    }

    axios.defaults.withCredentials = true

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users", formState)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                const {errors} = err.response.data
                const errorObj = {}
                for(let [key, value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                setErrorState(errorObj)
            })
    }



    return(
        <div>
            <form onSubmit={submitHandler}>
                <h1>Login</h1>
                <div>
                    <label>Username: </label>
                    <input onChange={changeHandler} type="text" name="email"/>
                    {(errorState) && <p>Invalid Email / Password</p>}
                </div>
                <div>
                    <label>Password: </label>
                    <input onChange={changeHandler} type="password" name="password"/>
                    {(errorState) && <p>Invalid Email / Password</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginComponent