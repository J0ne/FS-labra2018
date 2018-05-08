import React from "react";
import {Button, Icon, Dropdown} from 'semantic-ui-react'

class CustomerSelector extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            customers: this.props.customers
        }
    }

    render() {
        const { selectedCustomer, handleRemove, handleCustomerChange } = this.props
        return (
            <div>
                {selectedCustomer ? <div>
                    <h3>{selectedCustomer}</h3>
                    <Button onClick={handleRemove}>
                        <Icon name="user delete" />
                    </Button>
                </div>: <div>
                      <Dropdown fluid onChange={handleCustomerChange}
                            value={selectedCustomer}
                            placeholder='Valitse asiakas'
                            search selection options={this.state.customers}/>
                </div>}
            </div>
        )
    }
}

export default CustomerSelector