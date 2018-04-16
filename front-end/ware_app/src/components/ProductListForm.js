import React from 'react'
import { List, Item, Button } from 'semantic-ui-react'
// import NumberPicker from 'semantic-ui-react-numberpicker';
import NumberPicker from './NumberPicker'

class ProductListForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            product: this.props.product,
            amount: 1
        }
        this.updateNumberPicker = this.updateNumberPicker.bind(this);
    }
    
    updateNumberPicker = (e) =>{
        const newValue = Number(e.value)
        const updatedProduct = {...this.state.product, amount: newValue} 
        this.setState({ amount: newValue, updatedProduct });
        setTimeout(this.props.updateProduct, 1, updatedProduct);
    }

    render() {
        const { product } = this.props
        return(
            <List.Item key={product}>
                <NumberPicker value={this.state.amount} onChange={this.updateNumberPicker} />
                <Button floated="right" basic compact size='mini' icon="remove"></Button>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content> <List.Header as='a'>{product.name }</List.Header>
                    <List.Description as='a'>{product.description} {product.size}</List.Description>
                </List.Content>
            </List.Item>
        )
    } 
}

export default ProductListForm