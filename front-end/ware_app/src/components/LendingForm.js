import React from 'react'
import { Dropdown,Button, Checkbox, Form } from 'semantic-ui-react'
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
            selectedCustomer: null
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
    render() {
        const { customers } = this.props
        return (
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
                {/* <Dropdown placeholder='Valitse lainaaja' fluid selection options={friendOptions} /> */}
            </Form.Field>
            <Form.Field>
                    
                    <Select2
                        // value={this.state.selectedCustomer}
                        onSelect={this.customerSelect}
                        data={ this.props.customers }
                        options={
                            {
                                placeholder: 'Valitse asiakas',
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
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state.customers.map(c => {
            console.log(c)
            return {
                id: c.id,
                text: `${c.etunimi} ${c.sukunimi}`,
                value: c.id
            } 
        } )
    }
}

export default connect(
    mapStateToProps,
    { getCustomers }
)(LendingForm)