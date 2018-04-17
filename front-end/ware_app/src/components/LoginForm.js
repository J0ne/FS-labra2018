import React from 'react'
import {Container, Form, Button, Segment} from 'semantic-ui-react'
const LoginForm = ({onSubmit, username, password, handleLoginData }) => {
    return (
        <Container>
            <Segment>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Käyttäjätunnus</label>
                    <input onChange={handleLoginData} placeholder='käyttäjätunnus'/>
                </Form.Field>
                <Form.Field>
                    <label>Salasana</label>
                    <input
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