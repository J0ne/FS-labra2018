import React from 'react'
import { Input, Label, Button} from 'semantic-ui-react'

const numberPickerStyle = {
    width: 50
}

class NumberPicker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            amount: this.props.value
        }
    }

    changeValue = (e) => {
        console.log(e)
        const actionFilter = e.currentTarget.name
        let currentValue = this.state.amount
        switch (actionFilter) {
            case "plus":
                currentValue++ 
                break;
            case "minus":
                if (currentValue > 0) { 
                    currentValue--
                }
                break;
            default:
                break;
        }
        this.setState({ amount: currentValue })
        const returnValue = currentValue

        setTimeout(this.props.onChange, 1, {
            // name: this.props.name,
            value: returnValue
        });
    }

    render() {
        const { numberPickrStyle, target } = this.props
        return(
            <div style={numberPickrStyle}>
                <Input size="mini" style={numberPickerStyle} labelPosition='right' type='text' placeholder='kpl' >
                    <Button disabled={this.state.amount === 0} name="minus" size="mini" icon="minus" onClick={this.changeValue} icon="minus" />
                        <input value={this.props.value} onChange={(target) => this.changeValue(target)}/>
                    <Button name="plus" size="mini" icon="plus" onClick={this.changeValue} icon="plus" />
                </Input >
            </div>
        )
    }
}
export default NumberPicker
