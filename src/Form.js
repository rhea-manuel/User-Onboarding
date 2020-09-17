import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

export default function Form({users, changeUsers}) {

    // ----------------
    // STATE HOOKS
    // ----------------

    // The data is the backbone of the form.
    const [formData, updateForm] = useState({
        name: '',
        password: '',
        email: '',
        terms: false,

        // STRETCH GOAL: Added a blank field for the role.
        role: ''
    })

    // The errors have to have the same keys as the data, so I just spread it.
    const [errors, setErrors] = useState({...formData})

    // Finally, a state that manages whether the form can be submitted or not.
    const [canSubmit, submitPermission] = useState(false)

    // ----------------
    // EFFECT HOOKS
    // ----------------

    // If there's any errors, doesn't let the user submit.
    useEffect(() => {
        schema.isValid(formData).then(valid => {
            submitPermission(!valid)
        })
    }, [formData])

    // The schema for the form submission. Pretty straightforward: used most of the default requirements and added ones for the name and role.

    const schema = Yup.object().shape({
        email: Yup
            .string()
            .email("Must be a valid email address.")
            .required("Must include email address."),
        password: Yup
            .string()
            .min(6, "Passwords must be at least 6 characters long.")
            .required("Password is required"),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept the Terms of Service"),

        name: Yup
        .string()
        .required("Must enter a name"),
        
        role: Yup
        .string()
        .required("Must choose a role")
        
    });

    
    // Function that triggers when input is changed.
    const inputChange = event => {
        event.persist()

        // If a checkbox, uses the "checked" property
        if (event.target.type === 'checkbox'){
            performValidation(event.target.name, event.target.checked)
        }

        // Otherwise, uses the "value" property
        else{
            performValidation(event.target.name, event.target.value)
        }

               
    }

    // Helper function to perform validation.
    const performValidation = (name, type) => {

        // If the name & type are validated, sets the "error" to a blank string for that property.
        Yup.reach(schema, name).validate(type)
        .then(valid => {
            setErrors({ ...errors, [name]: '' })
        })

        // Otherwise, changes the error string to the first error message
        .catch(error => {
            console.log(error.errors[0])
            setErrors({ ...errors, [name]: error.errors[0] })
        })

        // Updates the form with the new data, whether it is valid or not.
        updateForm({
            ...formData,
            [name]: type
        })
    }

    // Function to submit the form.

    const submit = event =>{
        // Prevents the default.
        event.preventDefault()

        // Posts it to the API
        Axios.post("https://reqres.in/api/users", formData)
        .then(response => {
            
            // Makes a copy of the existing user array
            const newUsers = [...users]

            // Pushes the new user to the array
            newUsers.push(response.data)

            // Replaces existing users array with the new ont.
            changeUsers(newUsers)
        })
        .catch(error => console.log(error))
    }


    return (
        <div>

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