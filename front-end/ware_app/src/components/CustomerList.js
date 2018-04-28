import React from 'react'
import {
    Header, Table, Rating,
    List,
    Icon,
    Button,
    Container,Label
} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Togglable from './Togglable'
import CustomerForm from './CustomerForm'
import {connect} from 'react-redux'
import {getCustomers} from '../reducers/customerReducers'

class CustomerList extends React.Component {

    showCustomerForm = () => {
        return (
            <Togglable
                buttonLabel="Lisää lainaaja"
                ref={component => this.CustomerForm = component}>
                <CustomerForm/>
            </Togglable>
        )
    }

    render() {
        return (
            <Container>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='id card outline' circular/>
                    <Header.Content>
                        Lainaajat
                    </Header.Content>
                </Header>
                {this.showCustomerForm()}

                <Table celled>
                    <Table.Header>
                      <Table.Row>
                       <Table.HeaderCell singleLine>Nimi</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Puhelin</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                      <Table.Body>
                    {this.props.customers.map(c => <Table.Row key={c.id}>
                        <Table.Cell> 
                              <Header as='h4' textAlign='left'>{c.firstname} {c.lastname}</Header>
                        </Table.Cell>
                         <Table.Cell singleLine>{c.email}</Table.Cell>
                         <Table.Cell singleLine>{c.telephone}</Table.Cell>
                        <Table.Cell collapsing>
                                 <Link to={`/uusilainaus/` + c.id}>Lainaus</Link>
                        </Table.Cell>
                        </Table.Row>)}
                     </Table.Body>
                     </Table>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state.customers)
    return {customers: state.customers}
}

const ConnectedCustomerList = connect(mapStateToProps, null )(CustomerList)
export default ConnectedCustomerList