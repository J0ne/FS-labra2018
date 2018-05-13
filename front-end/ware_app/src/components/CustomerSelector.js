import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Icon, Dropdown} from 'semantic-ui-react'

class CustomerSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCustomer: this.props.selectedCustomer
        }
    }

    isSelected(customer, selected){
        return selected !== null && selected === customer
    }

    render() {
        const { selectedCustomer, handleRemove, toggleCustomer } = this.props

        return (
            <div>
                 <div>
                     
                <Table striped stackable>
                        <Table.Body>
                        {this.props.customers.map(p => 
                            <Table.Row key={p.id} positive={this.isSelected(p, selectedCustomer)} >
                                <Table.Cell name={p.id} collapsing>
                                 {p.lastname}, {p.firstname} 
                                 </Table.Cell>
                                 <Table.Cell collapsing textAlign='right'>
                                    <Button onClick={toggleCustomer(p)} basic={this.isSelected(p, selectedCustomer)} >
                                         <Icon color={this.isSelected(p, selectedCustomer) ? 'green' : 'grey'} 
                                         name='check'/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>)}
                        </Table.Body>
                    </Table>

            </div>
                {/* {selectedCustomer ? <div>
                    <h3>{selectedCustomer}</h3>
                    <Button onClick={handleRemove}>
                        <Icon name="user delete" />
                    </Button>
                </div>: <div>
                      <Dropdown fluid onChange={handleCustomerChange}
                            value={selectedCustomer}
                            placeholder='Valitse asiakas'
                            search selection options={this.state.customers}/>
                </div>} */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('selectedCustomer', state.selectedCustomer)
    return {
        customers: state.customers.map(p => {
            p.isSelected = false
            return p
        })
    }
}

const ConnectedCustomerSelector = connect(
    mapStateToProps,
    null
)(CustomerSelector)

export default ConnectedCustomerSelector