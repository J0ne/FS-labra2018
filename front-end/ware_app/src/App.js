import React, { Component } from 'react';
import {Provider} from 'react-redux'
import ConnectedProductList from './components/ProductList'
import LendingForm from './components/LendingForm'
import LoginForm from './components/LoginForm'
import MenuBar from './components/Menu'
import ConnectedLendingList from './components/LendingList'
import { productInitialization } from './reducers/productReducer'
import {logOut, logIn, register} from './reducers/userReducer'
import { getLendings } from './reducers/lendingReducer'
import { getCustomers } from './reducers/customerReducers'
import { connect } from 'react-redux'
import AdminView from './components/AdminView'
import RegisterForm from './components/RegisterForm'
import CustomerList from './components/CustomerList'
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
  Dimmer,
  Loader,
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
      password: '',
      showloader: false,
      registerdata: {
        name: '',
        username: '',
        password1: '',
        password2: ''
      }
    }
    this.logIn = this.logIn.bind(this)
    this.handleLoginFieldChange = this.handleLoginFieldChange.bind(this)
}
  handleItemClick = (e, { name }) => { 
    this.setState({ activeItem: name })
  }
  handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  componentDidMount = async () => {
    this.props.productInitialization()
    this.props.getLendings()
    this.props.getCustomers()
  }

  showUserDetails = () => {
    alert("Tästä käyttäjätietoihin... (tulossa)")
  }
  logOut = () => {
    this.setState({activeItem: '/'})
    this.props.logOut()
  }
  logIn = (e) => {
    const loginData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.logIn(loginData)
  }

handleRegisteration = (event) => {
  const registerdata = {...this.state.registerdata, 
    [event.target.name]: event.target.value
  }
  
  this.setState({ registerdata })
}
sendRegister = () => {
  const registerdata = this.state.registerdata
  console.log(this.state.registerdata)
    if(registerdata.name.length == 0 || registerdata.username.length == 0 ||
  registerdata.password1.length == 0 ){
    alert("Anna kaikki tiedot")
    return
  }
  if( registerdata.password1 !== registerdata.password2){
    alert("Salasanat eivät täsmää!")
    return
  }
  this.props.register(registerdata)
  this.setState({showloader: true})
  
  this.handleClose()
  if(this.props.user){
    this.setState({showloader: false})
  }
}
passwordsAreValid = () => {
  if(this.state.registerdata.username.length == 0) {
    return false
  }
  if(this.state.registerdata.password1.length < 5){
    return false
  }
  if(this.state.registerdata.password1 !== this.state.registerdata.password2){
    return false
  }
  return true
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
        Kirjaudu sisään tai  <Button onClick={this.handleOpen} basic color='green'>rekisteröidy</Button>
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
           <Route exact path="/rekisterointi" render={() => <RegisterForm/> } />
          <Route exact path="/asiakkaat" render={({ match }) => <CustomerList />} />    
        </div> : <div>
         <LoginForm handleLoginData={this.handleLoginFieldChange} logIn={this.logIn} username={this.state.username} password={this.state.password} />
        </div>}
        
          <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='small'>
          <Header icon='browser' content='Rekisteröidy' />
          <Modal.Content>
          <Dimmer active={this.state.showloader}>
            <Loader />
          </Dimmer>
          <RegisterForm username={this.state.registerdata.username} password1={this.state.registerdata.password1}
          password2={this.state.registerdata.password2}
          handleRegisteration={this.handleRegisteration} />
          </Modal.Content>
          <Modal.Actions>
             <Button color='grey' onClick={this.handleClose}>
              <Icon name='close' /> Peruuta
          </Button>
            <Button color='green' onClick={this.sendRegister}>
              <Icon name='checkmark' /> Rekisteröidy!
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
    user: state.user,
    showloader: state.showloader
  }
}

export default connect(
  mapStateToProps,
  { productInitialization, getLendings, logOut, logIn, register, getCustomers }
)(App)
