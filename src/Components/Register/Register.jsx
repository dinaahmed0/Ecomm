import React, { useState } from 'react';
import { ErrorMessage , useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [userMessage, setuserMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()



    function validate(values){
        let errors = {};
        if(!values.name){
            errors.name = 'Name is required'
        }else if(values.name.length < 3){
            errors.name = 'Name must be at least 3 characters'
        }
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
        if (!values.rePassword) {
            errors.rePassword = 'Password is Required';
        }else if(values.rePassword !== values.password){
            errors.rePassword = 'Passwords do not match'
        }
        if (!values.phone) {
            errors.phone = 'Phone is Required';
        }else if(!/^\d{11}$/i.test(values.phone)){
            errors.phone = 'Invalid Phone Number'
        }



        return errors;

    }
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
          },
          validate,
          onSubmit: values => {
            console.log(values);
            
            registerForm(values)
          },
    })

    async function registerForm(values){
        setIsLoading(true)
      return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then((data)=>{
        console.log(data.data);
        setuserMessage(data.data.message)
        setIsLoading(false)
        navigate('/login')
        
      }).catch((err)=>{
        console.log(err.response.data);
        setErrorMessage(err.response.data.message)
        setIsLoading(false)
      })
    }
  return (
    <>
      <div className="w-1/2 mx-auto">
        <h1 className='text-main text-3xl'>Register Now!</h1>
{userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400" role="alert">
<p>{userMessage}</p>
</div> : null}

{errorMessage? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-400" role="alert">
<p>{errorMessage}</p>    
</div> : null}

        <form onSubmit={formik.handleSubmit}>
        <div className='my-2'>
            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input name='name' type="text" id="name" 
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
{formik.touched.name && formik.errors.name? 
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{formik.errors.name}</p>
</div> : null}        

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

        <div className='my-2'>
            <label for="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
            <input name='rePassword' type="password" id="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
{formik.touched.rePassword && formik.errors.rePassword? 
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{formik.errors.rePassword}</p>
</div> : null}  

        <div className='my-2'>
            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input name='phone' type="tel" id="phone" 
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
{formik.touched.phone && formik.errors.phone? 
<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<p>{formik.errors.phone}</p>
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
            'Register'  
        )}  
        </button>  
        </div>
        </form>

      </div>


    </>
  )
}




