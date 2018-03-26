import React from 'react'
import { Input, Label, Button} from 'semantic-ui-react'

const numberPickerStyle = {
    width: 50
}

class NumberPicker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: 1
        }
    }

    changeValue = (e) => {
        let value = this.state.value
        e.currentTarget.name === 'plus' ? value++ : value--
        if(value < 0){ value = 0}
        this.setState({value})
    }

    render() {
        return(
            <Input size="mini" style={numberPickerStyle} labelPosition='right' type='text' placeholder='kpl' >
                <Button disabled={this.state.value === 0} name="minus" size="mini" icon="minus" onClick={this.changeValue} icon="minus" />
                <input value={this.state.value} />
                <Button name="plus" size="mini" icon="plus" onClick={this.changeValue} icon="plus" />
            </Input >
        )
    }
}
export default NumberPicker
