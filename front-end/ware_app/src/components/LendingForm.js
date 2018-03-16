import React from 'react'
import { Dropdown,Button, Checkbox, Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

const friendOptions = [
  {
    text: 'Pena',
    value: 'Pena'
  },
    {
        text: 'Eki',
        value: 'Eki'
    }, {
        text: 'Reiska',
        value: 'Reiska'
    }
]
const tuotteet = [
    {
        text: "Hattu",
        value: "Hattu"
    },
    {
        text: "Hanskat",
        value: "Hanskat"
    }
]
class LendingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        console.log(e.format('L'))
    }
    render() {

        return (
        <Form>
            <Form.Field>
                <Dropdown placeholder='Valitse lainaaja' fluid selection options={friendOptions} />
            </Form.Field>
            <Form.Field>
                    <Dropdown placeholder='Valitse Tuote' fluid selection options={tuotteet} />
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


export default LendingForm