import React from 'react'
import { Input, Label, Button} from 'semantic-ui-react'

const numberPickerStyle = {
    width: 50
}

class NumberPicker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.amount
        }
    }

    // changeValue = (e) => {
    //     let value = this.state.amount
    //     console.log(value)
    //     e.currentTarget.name === 'plus' ? value++ : value--
    //     if(value < 0){ value = 0}
    //     this.setState({ amount: value})
    // }

    render() {
        const { handleClick } = this.props
        return(
            <Input value={this.props.amount} size="mini" style={numberPickerStyle} labelPosition='right' type='text' placeholder='kpl' >
                <Button disabled={this.state.amount === 0} name="minus" size="mini" icon="minus" onClick={handleClick} icon="minus" />
                <input />
                <Button name="plus" size="mini" icon="plus" onClick={handleClick} icon="plus" />
            </Input >
        )
    }
}
export default NumberPicker
