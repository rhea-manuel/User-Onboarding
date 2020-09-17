import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

export default function Form({users, changeUsers}) {

    const [formData, updateForm] = useState({
        name: '',
        password: '',
        email: '',
        terms: false,
        role: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        terms: '',
        role: ''
    })

    const [canSubmit, submitPermission] = useState(false)

    const [post, setPost] = useState([])

    useEffect(()=>{
        if (errors.length>0){
            submitPermission(false)
        }
    }, [errors])

    const schema = Yup.object().shape({
        email: Yup
            .string()
            .email("Must be a valid email address.")
            .required("Must include email address."),
        password: Yup
            .string()
            .min(6, "Passwords must be at least 6 characters long.")
            .required("Password is Required"),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept Terms and Conditions"),

        name: Yup
        .string()
        .required("Must enter a name"),

        role: Yup
        .string()
        .required("Must choose a role")
        
    });

    useEffect(() => {
        schema.isValid(formData).then(valid => {
            submitPermission(!valid)
        })
    }, [formData])

    const inputChange = event => {
        event.persist()
        // console.log(event.target.value)

        if (event.target.type === 'checkbox'){
            performValidation(event.target.name, event.target.checked)
        }


        // else if(event.target.name === 'role'){
        //     updateForm({
        //         ...formData,
        //         role: event.target.value
        //     })
        // }

        else{
            performValidation(event.target.name, event.target.value)
        }

               
    }

    const performValidation = (name, type) => {
        Yup.reach(schema, name).validate(type)
        .then(valid => {
            setErrors({ ...errors, [name]: '' })
        })
        .catch(error => {
            console.log(error.errors[0])
            setErrors({ ...errors, [name]: error.errors[0] })
        })

        updateForm({
            ...formData,
            [name]: type
        })
    }


    const submit = event =>{
        event.preventDefault()
        console.log("Form is submitted")

        Axios.post("https://reqres.in/api/users", formData)
        .then(response => {
            console.log(response.data)
            
            const newUsers = [...users]
            newUsers.push(response.data)

            changeUsers(newUsers)
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            <form onSubmit={submit}>
                <label>
                    Name
                    <input name="name" type="text" value={formData.name} onChange={inputChange}></input>
                </label>
                <br></br>
                <label>
                    Email
                    
                    <input name="email" type="text" value={formData.email} onChange={inputChange}></input>
                    {errors.email.length > 0 ? (<span>{errors.email}</span>) : null}
                </label>
                <br></br>
                <label>
                    Password
                    <input name="password" type="text" value={formData.password} onChange={inputChange}></input>
                    {errors.password.length > 0 ? (<span>{errors.password}</span>) : null}
                </label>
                <br></br>
                <label>
                    Roles
                    <select name="role" onChange={inputChange}>
                        <option value="">none</option>
                        <option>Frontend developer</option>
                        <option>Backend devloper</option>
                        <option>Designer</option>
                    </select>

                    {errors.role.length > 0 ? (<span>{errors.role}</span>) : null}
                </label>
                <br></br>
                <label>
                    Do you accept the terms of service?
                    <input type="checkbox" name="terms" checked={formData.terms} onChange={inputChange}></input>
                    {errors.terms.length > 0 ? (<span>{errors.terms}</span>) : null}
                </label>
                <br></br>
                <button disabled={canSubmit}>Submit</button>
            </form>
        </div>
    )
}