import React, { useState, useContext } from 'react'
import { ErrorMessage , useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext'

export default function Login() {
  let {token, setToken} = useContext(TokenContext);
  const [userMessage, setuserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  function validate(values){
    let errors = {};
    if (!values.email) {
        errors.email = 'Email is Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Password is Required';
    }else if(!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)){
        errors.password = 'Invalid Password'
    }
    return errors;
  }

    let formik = useFormik({
            initialValues: {
                email: '',
                password: '',
              },
              validate,
              onSubmit: values => {
                console.log(values);
                
                loginForm(values)
              },
    })

    async function loginForm(values){
      setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data)=>{
      console.log(data.data.token);

      localStorage.setItem('userToken', data.data.token)
      setToken(data.data.token)
      setuserMessage(data.data.message)
      setIsLoading(false)
      navigate('/')
      
    }).catch((err)=>{
      console.log(err.response.data);
      setErrorMessage(err.response.data.message)
      setIsLoading(false)
    })
  }
  return (
    <>
      <div className=" w-1/2 mx-auto">
        <h1 className='text-main text-3xl'>Login Now!</h1>
{userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400" role="alert">
<p>{userMessage}</p>
</div> : null}

{errorMessage? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-400" role="alert">
<p>{errorMessage}</p>    
</div> : null}

        <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input name='email' type="email" id="email"  
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
{formik.touched.email && formik.errors.email? 
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{formik.errors.email}</p>
</div> : null}  

        <div className='my-2'>
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input name='password' type="password" id="password" 
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
{formik.touched.password && formik.errors.password? 
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{formik.errors.password}</p>
</div> : null}  
        <div className="my-4 text-end">
        <button  
        disabled={isLoading || !(formik.isValid && formik.dirty)} 
        type="submit"  
        className="bg-main text-white px-4 py-2 rounded-lg"  
    >  
        {isLoading ? (  
            <i className='fa fa-spinner fa-spin'></i>  
        ) : (  
            'Login'  
        )}  
        </button>  
        </div>
        </form>

       </div>


    
    </>
  )
}