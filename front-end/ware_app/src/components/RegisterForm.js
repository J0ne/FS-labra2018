import React from 'react'
import {Form, Button, Label} from 'semantic-ui-react'
class RegisterForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password1: '',
            password2: '',
            passwordsAreEqual: true
        }
    }
    handleLoginData = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({[event.target.name]: event.target.value, 
        passwordsAreEqual: this.state.password1 == this.state.password2}
    )
        
    }

    register = () => {
        console.log(this.state)
    }
    render () {
        return ( 
        <Form onSubmit={this.register}>
            <Form.Field>
                <label>Käyttäjätunnus</label>
                <input name="username" onChange={this.handleLoginData} placeholder='käyttäjätunnus'/>
            </Form.Field>
            <Form.Field>
                <label>Salasana</label>
                <input name="password1" type="password" value={this.state.password1} onChange={this.handleLoginData} placeholder='salasana'/>
            </Form.Field>
             { this.state.passwordsAreEqual !== true ? <Label basic color='red' pointing='below'>Salasanat eivät täsmää</Label> : ''}
             <Form.Field>
                <label>Toista salasana</label>
                <input name="password2" type="password" value={this.state.password2} onChange={this.handleLoginData} placeholder='salasana uudelleen'/>
            </Form.Field>
            <Button type='submit'>Rekisteröidy</Button>
        </Form>)
    }
}

export default RegisterForm