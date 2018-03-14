import React from 'react'
import { connect } from 'react-redux'

class ProductList extends React.Component {
    
    render() {
        return (
            <div>
                <h2>Tuotteet</h2>
                <ul>
                    {this.props.products.map(t => <li key={t.id}>{t.nimi}</li> )}
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
