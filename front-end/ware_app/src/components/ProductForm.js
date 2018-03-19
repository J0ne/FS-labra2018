import React from 'react'
import {List, Item, Button, Input, Label } from 'semantic-ui-react'

class ProductForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        const { product } = this.props
        console.log(product)
        return(
            <List.Item key={product}>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>{ product }</List.Header>
                    <List.Description as='a'>{""}</List.Description>
                    <Input labelPosition='right' type='text' placeholder='kappalemäärä'>
                        <input />
                        <Label>kpl</Label>
                    </Input>
                    {/* <Button floated="right"></Button> */}
                </List.Content>
            </List.Item>
        )
    } 
}

export default ProductForm