import React, {Component} from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import { addCustomer} from '../reducers/customerReducers'
import {connect} from 'react-redux'

const options = [
    {
        key: 'm',
        text: 'Mies',
        value: 'mies'
    }, {
        key: 'n',
        text: 'Nainen',
        value: 'nainen'
    }
]
class CustomerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            sex: '',
            size: '',
            email: '',
            telephone: '',
            showsuccess: false
        }

        // this.handleChange = this.handleChange.bind(this)
        // this.handleCb = this.handleCb.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleSubmit = (e) => {
        e.preventDefault()
        const newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            sex: this.state.sex,
            size: this.state.size,
            email: this.state.email,
            telephone: this.state.telephone
        }
        console.log(newCustomer)
        this.props.addCustomer(newCustomer)
    }
    handleCb= (event, {value}) => {
        this.setState({ size: value })
    }
    handleChange = (e, {value}) => {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const {value} = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <Message
                    visible={this.state.showsuccess}
                    success
                    header='Tallennus onnistui'
                    content="Henkilön tiedot tallennettu onistuneesti"/>
                <Form.Group widths='equal'>
                    <Form.Input name="firstname" onChange={this.handleChange} fluid label='Etunimi' placeholder='etunimi'/>
                    <Form.Input name="lastname" onChange={this.handleChange} fluid label='Sukunimi' placeholder='sukunimi'/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input name="telephone" onChange={this.handleChange} width={2} label='Puhelinnumero' placeholder='puhelinnumero'/>
                    <Form.Input name="email" onChange={this.handleChange} width={2} label='Email' placeholder='email'/> {/* <Form.Select fluid label='Sukupuoli' options={options} placeholder='Sukupuoli' /> */}
                </Form.Group>
                <Form.Group inline>
                    <label>Koko</label>
                    <Form.Radio
                        label='S'
                        value='s'
                        checked={this.state.size === 's'}
                        onChange={this.handleCb}/>
                    <Form.Radio
                        label='M'
                        value='m'
                        checked={this.state.size === 'm'}
                        onChange={this.handleCb}/>
                    <Form.Radio
                        label='L'
                        value='l'
                        checked={this.state.size === 'l'}
                        onChange={this.handleCb}/>
                    <Form.Radio
                        label='XL'
                        value='xl'
                        checked={this.state.size === 'xl'}
                        onChange={this.handleCb}/>
                </Form.Group>
                {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
                <Button.Group floated="right">
                    <Form.Button type="reset">Tyhjennä</Form.Button>
                    <Form.Button type="submit" floated="right" positive>Lisää lainaaja</Form.Button>
                </Button.Group>

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {custommers: state.customers}
}
export default connect(mapStateToProps, {addCustomer})(CustomerForm)