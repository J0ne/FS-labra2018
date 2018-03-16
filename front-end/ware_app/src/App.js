import React, { Component } from 'react';
import {Provider} from 'react-redux'
import productService from './services/products'
import ConnectedProductList from './components/ProductList'
import { productInitialization } from './reducers/productReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input
} from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      activeItem: 'Lainaukset'
    }
}

  handleItemClick = (e, { name }) => { 
    console.log(name)
    this.setState({ activeItem: name })}
  
  componentDidMount = async () => {
    this.props.productInitialization()

  }
  render() {

    const { activeItem } = this.state
    return (
      <Router>
      <Container>
        <Menu secondary>
          <Menu.Item name='Lainaukset' as={NavLink} to={"/lainaukset"} active={activeItem === 'Lainaukset'} onClick={this.handleItemClick} />
            <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={this.handleItemClick} />
            <Menu.Item name='Asiakkaat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
          <Route exact path="/lainaukset" render={({ match }) => <div><h1>Lainaukset</h1></div>} />
          <Route exact path="/varasto" render={() => <ConnectedProductList store={this.props.store} />} />

          <Route exact path="/asiakkaat" render={({ match }) => <div><h1>Asiakkaat</h1></div>} />
      </Container>
      </Router>
    );
  }
}

export default connect(
  null,
  { productInitialization }
)(App)
