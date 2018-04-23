import React from 'react'
import {Form, Button, Label} from 'semantic-ui-react'
const RegisterForm = ({handleRegisteration, username, password1, password2}) => {
return (
    <Form>
        <Form.Field>
            <label>Nimi</label>
            <input
                name="name"
                onChange={handleRegisteration}
                placeholder='name'/>
        </Form.Field>
        <Form.Field>
            <label>Käyttäjätunnus</label>
            <input
                name="username"
                onChange={handleRegisteration}
                placeholder='käyttäjätunnus'/>
        </Form.Field>
        <Form.Field>
            <label>Salasana</label>
            <input
                name="password1"
                type="password"
                value={password1}
                onChange={handleRegisteration}
                placeholder='salasana'/>
        </Form.Field>
        <Form.Field>
            <label>Toista salasana</label>
            <input
                name="password2"
                type="password"
                value={password2}
                onChange={handleRegisteration}
                placeholder='salasana uudelleen'/>
        </Form.Field>
    </Form>
)
}  

export default RegisterForm