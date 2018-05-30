import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from 'react-router-dom'
import LendingForm from './LendingForm'
import LoginForm from './LoginForm'
import MenuBar from './Menu'
import ConnectedLendingList from './LendingList' 
import ConnectedProductList from './ProductList'
import RegisterForm from './RegisterForm'
import CustomerList from './CustomerList'
import AdminView from './AdminView'

 const MainContent = (store) => {

      return (<div>
            <Route exact path="/" render={({ match }) => <div>
              <ConnectedLendingList store={store} />
            </div>} />
            <Route path="/uusilainaus/:customerid?" render={({ match }) => <div>
              <LendingForm customerid={match.params.customerid} store={store} />
            </div>} />
          <Route exact path="/varasto" render={() => <ConnectedProductList />} />
          <Route exact path="/admin" render={() => <AdminView/> } />
           <Route exact path="/rekisterointi" render={() => <RegisterForm/> } />
          <Route exact path="/asiakkaat" render={({ match }) => <CustomerList />} />    
        </div> )
    }

export default MainContent