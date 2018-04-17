import React, { Component } from 'react';
import {Provider} from 'react-redux'
import ConnectedProductList from './components/ProductList'
import LendingForm from './components/LendingForm'
import LoginForm from './components/LoginForm'
import MenuBar from './components/Menu'
import ConnectedLendingList from './components/LendingList'
import { productInitialization } from './reducers/productReducer'
import { logOut, logIn } from './reducers/userReducer'
import { getLendings } from './reducers/lendingReducer'
import { connect } from 'react-redux'
import AdminView from './components/AdminView'
import RegisterForm from './components/RegisterForm'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import {
  Label,
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Input,
  Modal,
  Segment
} from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      activeItem: '/',
      modalOpen: false,
      username: '',
      password: ''
    }
}
  handleItemClick = (e, { name }) => { 
    this.setState({ activeItem: name })
  }
  handleLoginFieldChange = (event) => {
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  componentDidMount = async () => {
    this.props.productInitialization()
    this.props.getLendings()
  }

  showUserDetails = () => {
    alert("Tästä käyttäjätietoihin... (tulossa)")
  }
  logOut = () => {
    this.setState({activeItem: '/'})
    this.props.logOut()
  }
  logIn = (e) => {
    e.preventDefault()
    alert("Login...")
    this.props.logIn()
  }
 handleRegister = (e) => {
   console.log(e)
    this.showRegisterForm()
 }

 showRegisterForm() {
   return <RegisterForm />
 }

  render() {

    const { activeItem } = this.state
    return (
      <div>
      <Router>
      <Container> 
        {this.props.user ? <MenuBar activeItem={this.activeItem} user={this.props.user} showUserDetails={this.showUserDetails} 
      handleItemClick={this.handleItemClick} logOut={this.logOut} logIn={this.logIn} /> : 
        <Header as='h2'>
    <Icon name='table' />
    <Header.Content>
      Varasto
      <Header.Subheader>
        Kirjaudu sisään
      </Header.Subheader>
    </Header.Content>
  </Header>}
        {this.props.user ? <div>
            <Route exact path="/" render={({ match }) => <div>
              <ConnectedLendingList store={this.props.store} />
            </div>} />
            <Route exact path="/uusilainaus" render={({ match }) => <div>
              <LendingForm store={this.props.store} />
            </div>} />
          <Route exact path="/varasto" render={() => <ConnectedProductList />} />
          <Route exact path="/admin" render={() => <AdminView/> } />
          <Route exact path="/asiakkaat" render={({ match }) => <div><h1>Asiakkaat</h1>
              <Button onClick={this.handleOpen}>Show Modal</Button>
          </div>} />    
        </div> : <div>
            <Button basic color='blue' onClick={this.handleRegister}>Rekisteröidy</Button>
         <LoginForm handleLoginData={this.handleLoginFieldChange} onSubmit={this.logIn} username={this.state.username} password={this.state.password} />
          <RegisterForm />
        </div>}
        
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { productInitialization, getLendings, logOut, logIn }
)(App)
