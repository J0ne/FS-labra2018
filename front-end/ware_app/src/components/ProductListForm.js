import React from 'react'
import { List, Item, Button } from 'semantic-ui-react'
// import NumberPicker from 'semantic-ui-react-numberpicker';
import NumberPicker from './NumberPicker'

class ProductListForm extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        const { product, handleClick } = this.props
        console.log('handleClick',handleClick)
        return(
            <List.Item key={product}>
                <NumberPicker handleClick={handleClick} />
                <Button floated="right" basic compact size='mini' icon="remove"></Button>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content> <List.Header as='a'>{product.nimi }</List.Header>
                    <List.Description as='a'>{product.kuvaus} {product.koko}</List.Description>
                </List.Content>
                {/* <NumberPicker value={this.state.numberPickerValue} onChange={this.updateNumberPicker} /> */}
            </List.Item>
        )
    } 
}

export default ProductListForm