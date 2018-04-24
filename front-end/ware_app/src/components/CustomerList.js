import React from 'react'
import {
    Image,
    List,
    Icon,
    Button,
    Container,
    Header, Label
} from 'semantic-ui-react'
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
                <List celled verticalAlign='middle'>
                    {this
                        .props
                        .customers
                        .map(c => <List.Item key={c.id}>
                         <List.Content floated="right">
                                <Button>Lainaus</Button>
                            </List.Content>
                            <Icon name="user"/>
                            <List.Content>
                                <List.Header>{c.firstname} {c.lastname}</List.Header>
                                {c.email} 
                                 <Label as='a' basic color='blue'>
                                 <Icon name="phone" />
                                 {c.telephone}</Label>
                            </List.Content>
                        </List.Item>)}
                </List>
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