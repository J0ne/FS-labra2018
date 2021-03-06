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
import MainContent from './components/MainContent'
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
  Segment,
  Responsive,
  Sidebar, Menu
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
      sidebarVisible: false,
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
    this.setState({ activeItem: name, sidebarVisible: false })
  }
  toggleVisibility = () => this.setState({
    sidebarVisible: !this.state.sidebarVisible
  })
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
 MainContent = () => {
      return (<div>
            <Route exact path="/" render={({ match }) => <div>
              <ConnectedLendingList store={this.props.store} />
            </div>} />
            <Route path="/uusilainaus/:customerid?" render={({ match }) => <div>
              <LendingForm customerid={match.params.customerid} store={this.props.store} />
            </div>} />
          <Route exact path="/varasto" render={() => <ConnectedProductList />} />
          <Route exact path="/admin" render={() => <AdminView/> } />
           <Route exact path="/rekisterointi" render={() => <RegisterForm/> } />
          <Route exact path="/asiakkaat" render={({ match }) => <CustomerList />} />    
        </div> )
    }
  render() {

    const { activeItem } = this.state
    return (
      <div>
      <Router>
      <Container> 
        {this.props.user ?   <Responsive {...Responsive.onlyMobile}>
      <Menu fluid>
       <Button icon='content' basic onClick={this.toggleVisibility} />
        {/* {this.getMenuRightContent()} */}
      </Menu>
   
    <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} as={Menu} animation='scale down'width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical inverted>
            <Menu.Item name='Lainaukset' as={NavLink} to={"/"} active={activeItem === 'lainaukset'} onClick={this.handleItemClick} />
            <Menu.Item as={NavLink} to={"/uusilainaus"} active={activeItem === 'uusilainaus'} onClick={this.handleItemClick}>Uusi lainaus</Menu.Item>
            <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={this.handleItemClick} />
            <Menu.Item name='Lainaajat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={this.handleItemClick} />
                      {this.props.user && this.props.user.admin ? 
            <Menu.Item color="red" name='Admin' as={NavLink} to={"/admin"} active={activeItem === 'admin'} onClick={this.handleItemClick} />: ''}       
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
                < MainContent ref = {
                  component => this.mainContent = component
                }
                />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
  </Responsive> : 
        <Header as='h2'>
    <Icon name='table' />
    <Header.Content>
      Varasto
      <Header.Subheader>
        Kirjaudu sisään tai  <Button onClick={this.handleOpen} basic color='green'>rekisteröidy</Button>
      </Header.Subheader>
    </Header.Content>
  </Header>}
        {this.props.user ? <Responsive as={Container} minWidth={768} >
        <MainContent ref={component => this.mainContent = component}/>
        </Responsive> : <div>
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
