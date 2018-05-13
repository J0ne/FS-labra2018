import React from "react";
import { connect } from 'react-redux'
import { Table, Button, Icon, Dropdown} from 'semantic-ui-react'

class CustomerSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        const { selectedCustomer, handleRemove, toggleCustomer } = this.props
        console.log(selectedCustomer)
        return (
            <div>
                 <div>
                     
                <Table striped stackable>
                        <Table.Body>
                        {this.props.customers.map(p => 
                            <Table.Row key={p.id} positive={p.isSelected} >
                                <Table.Cell name={p.id} collapsing>
                                 {p.lastname}, {p.firstname} 
                                 </Table.Cell>
                                 <Table.Cell collapsing textAlign='right'>
                                    <Button onClick={toggleCustomer(p)} >
                                         <Icon name={selectedCustomer !== null && selectedCustomer === p ? 'check' : 'plus' }/>
                                  
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