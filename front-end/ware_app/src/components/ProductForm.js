import React from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createProduct} from '../reducers/productReducer'


const options = [
    { key: '-', text: ' Ei valintaa ', value: 'ei valintaa' },
    { key: 'k', text: 'Kesä', value: 'kesä' },
    { key: 't', text: 'Talvi', value: 'talvi' },
]

class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tuote: null,
            nimi: '',
            koko: '',
            kpl: 0,
            tiedot: '',
            open: false
        }
    }
    

    show = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleSubmit = (e) => {
        e.preventDefault()
        const newProduct = {
            nimi: this.state.nimi,
            koko: this.state.koko,
            kuvaus: this.state.tiedot,
            kpl: this.state.kpl
        }
        this.props.createProduct(newProduct)
    }
    handleInput = (event) => {
      
        if(event.target.name === 'kpl' && !Number(event.target.value)){
            return;
        }
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChange = (e, { value }) => {
        this.setState({ koko: value })
        console.log(this.state)
    }

    render() {
        const { value, open } = this.state
        return (
            <Form onSubmit={this.handleSubmit} >
                <h2>Lisää tuote</h2>
                <Form.Group widths='equal'>
                    <Form.Input name="nimi" onChange={this.handleInput} fluid label='Tuote' placeholder='nimi' />
                    <Form.Select fluid label='Malli' value="-" options={options} placeholder='' />
                    <Form.Input name="kpl" onChange={this.handleInput} fluid label='Kappalemäärä' placeholder='' />
                </Form.Group>
                <Form.Group inline>
                    <label>Koko (jos vaatekappale)</label>
                    <Form.Radio label='S' value='s' checked={this.state.koko === 's'} onChange={this.handleChange} />
                    <Form.Radio label='M' value='m' checked={this.state.koko === 'm'} onChange={this.handleChange} />
                    <Form.Radio label='L' value='l' checked={this.state.koko === 'l'} onChange={this.handleChange} />
                    <Form.Radio label='XL' value='xl' checked={this.state.koko === 'xl'} onChange={this.handleChange} />
                    <Form.Radio label='Ei huomioida' value='' checked={this.state.koko === ''} onChange={this.handleChange} />
                </Form.Group>
                <Form.TextArea 
                    name="tiedot" label='Tarkemmat tiedot' 
                    placeholder='Tuotteen tarkemmat tiedot' 
                    onChange={this.handleInput}
                />
                <Button.Group floated="right" >
                <Form.Button type="reset">Tyhjennä</Form.Button>
                <Form.Button  type="submit" floated="right" positive>Lisää tuote</Form.Button>
                </Button.Group>
                <Modal size="mini" open={open} onClose={this.close}>
                    <Modal.Header>
                        Tuotteen lisäys
                    </Modal.Header>
                    <Modal.Content>
                        <p>Tallennetaanko {this.state.tuote}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>
                            Ei
                         </Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Kyllä vain!' />
                    </Modal.Actions>
                </Modal>
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("state",state.products)
    return {
        products: state.products
    }
}
export default connect(
    mapStateToProps,
    { createProduct }
)(ProductForm)
