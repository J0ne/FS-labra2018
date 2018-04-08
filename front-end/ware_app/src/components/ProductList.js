import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import { Button, Label, Table, Icon } from 'semantic-ui-react'
import Togglable from './Togglable'

class ProductList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false
        }
    }

    showProductForm = () => {
            return (
                <Togglable buttonLabel="Lisää tuote" ref={component => this.ProductForm = component}>
                    <ProductForm />
                </Togglable>)
    }

    render() {
        return (
            <div>
                <h1>Varasto</h1>
               
            
                <h2>Tuotteet</h2>
                {this.showProductForm()}
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Tuote</Table.HeaderCell>
                            <Table.HeaderCell>Kuvaus</Table.HeaderCell>
                            <Table.HeaderCell>Koko</Table.HeaderCell>
                            <Table.HeaderCell>Varastossa (kpl)</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                        <Table.Body>
                        {this.props.products.map(t => 
                            <Table.Row key={t.id}>
                                <Table.Cell collapsing>
                                    <Icon name='circle thin' /> {t.name}
                                 </Table.Cell>
                                <Table.Cell>{t.description}</Table.Cell>
                                <Table.Cell>{t.size}</Table.Cell>
                                <Table.Cell collapsing textAlign='right'>{t.amountInStorage}</Table.Cell>
                            </Table.Row>)}
                    
                        </Table.Body>
                    </Table>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const ConnectedProductList = connect(
    mapStateToProps,
    null
)(ProductList)

export default ConnectedProductList
