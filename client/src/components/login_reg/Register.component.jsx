import React, { useEffect, useState } from 'react'
import { Router, navigate, Link } from '@reach/router'
import axios from 'axios'

const RegisterComponent = props => {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:""
    })

    const [errorState, setErrorState] = useState({})

    axios.defaults.withCredentials = true

    const changeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users", formState)
            .then(res => {
                console.log(res)
                // navigate('/')
            })
            .catch(err => {
                console.log(err)
                // const {errors} = err.response.data
                // const errorObj = {}
                // for(let [key, value] of Object.entries(errors)){
                //     errorObj[key] = value.message
                // }
                // setErrorState(errorObj)
            })
    }



    return(
        <div>
            <form onSubmit={submitHandler}>
                <h1>Register</h1>
                <div>
                    <h3>First Name:</h3>
                    <input type="text" name="firstName" value={formState.firstName} onChange={changeHandler}/>
                    {(errorState.firstName) && <p>{errorState.firstName}</p>}
                </div>
                <div>
                    <h3>Last Name:</h3>
                    <input type="text" name="lastName" value={formState.lastName} onChange={changeHandler}/>
                    {(errorState.lastName) && <p>{errorState.lastName}</p>}
                </div>
                <div>
                    <h3>Email:</h3>
                    <input type="email" name="email" value={formState.email} onChange={changeHandler}/>
                    {(errorState.email) && <p>{errorState.email}</p>}
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type="password" name="password" value={formState.password} onChange={changeHandler}/>
                    {(errorState.password) && <p>{errorState.password}</p>}
                </div>
                <div>
                    <h3>Confirm Password:</h3>
                    <input type="password" name="confirmPassword" value={formState.confirmPassword} onChange={changeHandler}/>
                    {(errorState.confirmPassword) && <p>{errorState.confirmPassword}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterComponent