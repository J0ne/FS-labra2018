import React from 'react'
import Divider, { Container, Dropdown, Button, Checkbox, Form, Header, Step } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { connect } from 'react-redux'
import { getCustomers } from '../reducers/customerReducers'
import $ from 'jquery'; 

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
            selectedProducta: [],
            deadlineDate: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.customerSelect = this.customerSelect.bind(this);
    }

    

    componentDidMount(){
        this.props.getCustomers()
    }
    handleChange = (e) => {
        console.log(e.format('L'))
    }
    customerSelect = (e) => {
        // console.log(e)
        // this.setState({ selectedCustomer: Number(e.currentTarget.value)})
        // //console.log(this.refs.tags.el)
        // return false
    }

    isActiveStep(step){
        if(!this.state.selectedCustomer){

        }
    }

    render() {
        const { customers } = this.props
        return (
        <Container>
                <Header as="h3">Uusi lainaus</Header>
                <Step.Group ordered fluid>
                    <Step completed active>
                        <Step.Content>
                            <Step.Title>Asiakas</Step.Title>
                            <Step.Description>Valitse asiakas</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step>
                        <Step.Content>
                            <Step.Title>Tuoteet</Step.Title>
                            <Step.Description>Valitse tuotteet</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step>
                        <Step.Content>
                            <Step.Title>Kuittaus</Step.Title>
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
            <Form.Field>
                   <Select2
                        // value={this.state.selectedCustomer}
                        onSelect={this.customerSelect}
                        data={this.props.customers}
                        options={
                            {
                                placeholder: 'Valitse asiakas',
                            }
                        }
                    />
            </Form.Field>
            <Form.Field>
                    <Select2
                        // value={this.state.selectedCustomer}
                        multiple
                        data={this.props.products}
                        options={
                            {
                                placeholder: 'Poimi tuotteita',
                            }
                        }
                    />
            </Form.Field>
            <Form.Field>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        placeholderText="Palautuspäivä" />
            </Form.Field>
            <Button type='submit'>Lisää</Button>
        </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state.customers.map(c => {
            return {
                id: c.id,
                text: `${c.etunimi} ${c.sukunimi}`,
                value: c.id
            } 
        } ),
        products: state.products.map(p => {
            console.log(p)
            return {
                id: p.id,
                value: p.id,
                text: p.nimi
            }
        })
    }
}

export default connect(
    mapStateToProps,
    { getCustomers }
)(LendingForm)