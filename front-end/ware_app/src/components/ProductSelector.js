import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import { Button, Label, Table, Icon } from 'semantic-ui-react'
import Togglable from './Togglable'

class ProductSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false
        }
    }
    render() {
        const {selectProduct} = this.props
        return (
            <div>
                <Table celled striped>
                        <Table.Body>
                        {this.props.products.map(t => 
                            <Table.Row key={t.id} positive={t.isSelected} >
                                <Table.Cell name={t.id} collapsing>
                                {t.name}
                                 </Table.Cell>
                                <Table.Cell collapsing>{t.description}</Table.Cell>
                                <Table.Cell>{t.size}</Table.Cell>
                                 <Table.Cell collapsing >
                                    <Button onClick={selectProduct(t)} positive={!t.isSelected}>
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
        })
    }
}

const ConnectedProductSelector = connect(
    mapStateToProps,
    null
)(ProductSelector)

export default ConnectedProductSelector
