import React from 'react'
import Divider, { Container, Dropdown, Button, 
    Checkbox, Form, Header, Step, Segment, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux'
import { getCustomers } from '../reducers/customerReducers'

const friendOptions = [
  {
      id: 1,
    text: 'Pena',
    value: 'Pena'
  },
    {
        id: 2,
        text: 'Eki',
        value: 'Eki'
    }, {
        id: 3,
        text: 'Reiska',
        value: 'Reiska'
    }
]
const tuotteet = [
    {
        id: 1,
        text: "Hattu",
        value: "Hattu"
    },
    {
        id: 2,
        text: "Hanskat",
        value: "Hanskat"
    }
]
class LendingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            selectedCustomer: null,
            selectedProducts: [],
            productsSelected: false,
            deadlineDate: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.customerSelect = this.customerSelect.bind(this);
    }

    
    handleCustomerChange = (event, data) => {
        this.setState({selectedCustomer: data.value})
    }
    handleProductsChange = (event, data) => {
        console.log(data.value, data.key)
        this.setState({ selectedProducts: data.value})
    } 
    componentDidMount(){
        this.props.getCustomers()
    }
    handleChange = (e) => {
        console.log(e.format('L'))
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }

    customerSelect = (e) => {
        // console.log(e)
        // this.setState({ selectedCustomer: Number(e.currentTarget.value)})
        // //console.log(this.refs.tags.el)

    }

    activeStep(){
        if(this.state.selectedCustomer === null){
            return 0 
        }
        if (!this.state.productsSelected) {
            return 1
        }
        else{
            return 2;
        }

    }
    
    getDisplayValue(val){
        if (this.activeStep() === val){
            return {display: ''}
        }
        else {
            return {display: 'none'}
        }
    }

    render() {
        
        const { customers } = this.props
        return (
        <Container>
                <Header as="h3">Uusi lainaus</Header>
                <Step.Group ordered fluid>
                    <Step active={this.state.selectedCustomer === null}
                    completed={this.state.selectedCustomer !== null}
                   >
                        <Step.Content>
                            <Step.Title>Asiakas</Step.Title>
                            <Step.Description>Valitse asiakas</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={this.state.selectedProducts.length == 0 && this.state.selectedCustomer != null}
                        completed={this.state.selectedProducts.length > 0}>
                        <Step.Content>
                            <Step.Title>Tuoteet</Step.Title>
                            <Step.Description>Valitse tuotteet</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step>
                        <Step.Content>
                            <Step.Title>Tiedot</Step.Title>
                            <Step.Description>Tilauksen tarkemmat tiedot</Step.Description>
                        </Step.Content>
                    </Step>
                    <Step disabled={true}>
                        <Step.Content>
                            <Step.Title>Palautus</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
        
        <Form>
            {/* <Form.Field>
                    <Select2
                        data={friendOptions}
                        options={
                            {
                                placeholder: 'Valitse asiakas',
                            }
                        }
                    />
            </Form.Field> */}
            <Form.Field style={this.getDisplayValue(0)}>
                <Dropdown 
                onChange={this.handleCustomerChange}
                value={this.state.selectedCustomer}
                placeholder='Valitse asiakas' 
                fluid search selection options={this.props.customers} />
            </Form.Field>
            <Form.Field style={this.getDisplayValue(1)}>
                <Dropdown 
                value={this.state.selectedProducts} 
                onChange={this.handleProductsChange}
                placeholder='Valitse tuotteet' 
                multiple
                fluid search selection 
                options={this.props.products} />
                        <Form.Field>
                            <Button floated="right" onClick={this.handleProductSelection}>Valmis</Button>
                        </Form.Field>
            </Form.Field>

            <Form.Field style={this.getDisplayValue(2)}>
                {/* <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        placeholderText="Palautuspäivä" /> */}
            </Form.Field>
           
        </Form>
                <Container>
                    
                    <Segment.Group style={this.getDisplayValue(1)}>
                        {this.state.user !== null ? <Segment><Icon name="user" />{this.state.selectedCustomer} </Segment> : ''}
                        <Segment>
                            <ul>
                            {this.state.selectedProducts.map(p => <li key="{}">{p}</li>)}
                            </ul>
                        </Segment>
                        <Segment>Nested Bottom</Segment>
                    </Segment.Group>
                 </Container>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state.customers.map(c => {
            return {
                text: `${c.etunimi} ${c.sukunimi}`,
                key: c.id,
                value: `${c.etunimi} ${c.sukunimi}`
            } 
        } ),
        products: state.products.map(p => {
            return {
                key: p.id,
                text: p.nimi,
                value: p.nimi
            }
        })
    }
}

export default connect(
    mapStateToProps,
    { getCustomers }
)(LendingForm)