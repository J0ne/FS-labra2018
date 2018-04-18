import React from 'react'
import {Container, Form, Button, Segment} from 'semantic-ui-react'
import Togglable from './Togglable'
import RegisterForm from './RegisterForm'
const LoginForm = ({logIn, username, password, handleLoginData}) => {

    return (
        <Container>
            <Segment>
            <Form onSubmit={logIn}>
                <Form.Field>
                    <label>Käyttäjätunnus</label>
                    <input name="username" 
                    onChange={handleLoginData} placeholder='käyttäjätunnus'/>
                </Form.Field>
                <Form.Field>
                    <label>Salasana</label>
                    <input
                        name="password"
                        type="text"
                        onChange={handleLoginData}
                        placeholder='salasana (todo: type -> password)'/>
                </Form.Field>
                <Button type='submit'>Kirjaudu</Button>
            </Form>
            </Segment>        
        </Container>
    )
}
export default LoginForm