import React, { Component } from 'react';
import {Provider} from 'react-redux'
import productService from './services/products'
import ConnectedProductList from './components/ProductList'
import { productInitialization } from './reducers/productReducer'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount = async () => {
    this.props.productInitialization()

  }
  render() {
    return (
      <div className="App">
        <ul>
        {this.state.products.map( p => <li key={p.id}>{p.nimi}</li>)}
        </ul>
        <p className="App-intro">
        </p>
        <ConnectedProductList store={this.props.store} />
      </div>
    );
  }
}

export default connect(
  null,
  { productInitialization }
)(App)
