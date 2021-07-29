import React, {useEffect,useState} from 'react'
import { Router, navigate, Link } from '@reach/router'
import axios from 'axios'

import LoginComponent from './login_reg/Login.component'
import RegisterComponent from './login_reg/Register.component'

const Home = props => {




    return(
        <div>
            <LoginComponent/>
            <RegisterComponent/>
        </div>
    )
}

export default Home