import React, { Component } from 'react';
import {Provider} from 'react-redux'
import ConnectedProductList from './components/ProductList'
import LendingForm from './components/LendingForm'
import ConnectedLendingList from './components/LendingList'
import { productInitialization } from './reducers/productReducer'
import { getLendings } from './reducers/lendingReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Menu,
  Input,
  Modal
} from 'semantic-ui-react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      activeItem: '/',
      modalOpen: false
    }
}
  handleItemClick = (e, { name }) => { 
    this.setState({ activeItem: name })}
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  componentDidMount = async () => {
    this.props.productInitialization()
    this.props.getLendings()
  }
  render() {

    const { activeItem } = this.state
    return (
      <div>
      <Router>
      <Container>
       <Menu stackable={true}>
        <Menu.Item name='Lainaukset' as={NavLink} to={"/"} active={activeItem === '/'} onClick={this.handleItemClick} />
        <Menu.Item name='Uusi lainaus' as={NavLink} to={"/uusilainaus"} active={activeItem === 'uusilainaus'} onClick={this.handleItemClick} />
        <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={this.handleItemClick} />
        <Menu.Item name='Asiakkaat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>
         <Route exact path="/" render={({ match }) => <div>
              <ConnectedLendingList store={this.props.store} />
            </div>} />
            <Route exact path="/uusilainaus" render={({ match }) => <div>
              <LendingForm store={this.props.store} />
            </div>} />
          <Route exact path="/varasto" render={() => <ConnectedProductList />} />
          <Route exact path="/asiakkaat" render={({ match }) => <div><h1>Asiakkaat</h1>
              <Button onClick={this.handleOpen}>Show Modal</Button>
          </div>} />    
          <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
          >
          <Header icon='browser' content='Cookies policy' />
          <Modal.Content>
            <h3>This website uses cookies to ensure the best user experience.</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.handleClose} inverted>
              <Icon name='checkmark' /> Got it
          </Button>
          </Modal.Actions>
        </Modal>    
      </Container>
      </Router>
      </div>
    );
  }
}

export default connect(
  null,
  { productInitialization, getLendings }
)(App)
