import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import { Button, Label, Table, Icon, TableCell } from 'semantic-ui-react'
import Togglable from './Togglable'
import NumberPicker from './NumberPicker';

class ProductSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false
        }
    }

    getAmount(id){
        if(this.props.selectedProducts.length === 0) return 1
        const product = this.props.selectedProducts.find( x => x.id === id)
        const amount = product ? product.amount : 1
        return amount
    }
    render() {
        const {selectProduct, updateNumberPicker } = this.props
        const show = (selected) => {
            const display = selected ? { display: 'block'}  : { display : 'none' }
            
            return display
        }
        return (
            <div>
                <Table size='small' striped stackable verticalAlign='top'>
                        <Table.Body>
                        {this.props.products.map(t => 
                            <Table.Row key={t.id} positive={t.isSelected} >
                                <Table.Cell name={t.id} collapsing verticalAlign='top'>
                                 {t.name} <br/>
                                 <div style={show(t.isSelected)}>
                                        <NumberPicker value={this.getAmount(t.id)} onChange={updateNumberPicker(t.id)} />
                                    </div>
                                 </Table.Cell>
                                <Table.Cell verticalAlign='top'>{t.description} 
                                 </Table.Cell>
                                 <Table.Cell verticalAlign='top' collapsing> {t.size ?<Label>{t.size}</Label>: ''} </Table.Cell>
                                {/* <Table.Cell>
                                  
                                </Table.Cell> */}
                                 <Table.Cell textAlign='right' verticalAlign='top'>
                                    <Button size='mini' onClick={selectProduct(t)} positive={!t.isSelected}>
                                         <Icon name={t.isSelected ? 'remove' : 'plus' }/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>)}
                        </Table.Body>
                    </Table>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.map( p => {
            if(state.selectedProducts.includes(p)){
                p.isSelected = true
                return p
            }
            else {
                p.isSelected = false
                return p
            }
        }),
        selectedProducts: state.selectedProducts
    }
}

const ConnectedProductSelector = connect(
    mapStateToProps,
    null
)(ProductSelector)

export default ConnectedProductSelector
