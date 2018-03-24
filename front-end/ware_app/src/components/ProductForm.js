import React from 'react'
import {Form, List, Item, Button, Input, Label, Icon } from 'semantic-ui-react'
// import NumberPicker from 'semantic-ui-react-numberpicker';

class ProductForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            numberPickerValue: '0',
            name: ''
        }
    }
    updateNumberPicker =  (e) => {
    /*
     * The value is expected as string to avoid warnings 
     * append an empty string to your possibly numberic value
    */
    this.setState({ numberPickerValue: e.value + '' });
    }
    render() {
        const { product } = this.props
        console.log(product)
        return(
            <List.Item key={product}>
                <Button floated="right" basic compact size='mini' icon="remove"></Button>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content> <List.Header as='a'>{ product }</List.Header>
                    <List.Description as='a'>{"TODO: lisätiedot, koko, ym."}</List.Description>
                </List.Content>
               
            </List.Item>
        )
    } 
}

export default ProductForm