import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import { Label } from 'semantic-ui-react'
class ProductList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showForm: false
        }
    }


    render() {
        return (
            <div>
                <h1>Varasto</h1>
               
                <ProductForm />
                <h2>Tuotteet</h2>
                <ul>
                    {this.props.products.map(t => <li key={t.id}>{t.nimi}, {t.kuvaus} <Label>Koko <Label.Detail>{t.koko}</Label.Detail></Label></li> )}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state.products)
    return {
        products: state.products
    }
}

const ConnectedProductList = connect(
    mapStateToProps,
    null
)(ProductList)

export default ConnectedProductList
