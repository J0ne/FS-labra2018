import React from 'react'
import {connect} from 'react-redux'
import { Icon, Table, Button } from 'semantic-ui-react'
import moment from 'moment'
import {getLendings} from '../reducers/lendingReducer'

class LendingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    render() {
        
        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Numero</Table.HeaderCell>
                        <Table.HeaderCell>Lainauspäivä</Table.HeaderCell>
                        <Table.HeaderCell>Asiakas</Table.HeaderCell>
                        <Table.HeaderCell>Yhteenveto</Table.HeaderCell>
                        <Table.HeaderCell>Palautuspäivä</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Kuittaus</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.lendings.map(lainaus => 
                    <Table.Row key={lainaus.id} negative={lainaus.myohassa}>
                        <Table.Cell>{lainaus.id}</Table.Cell>
                        <Table.Cell>{lainaus.alkupvm}</Table.Cell>
                        <Table.Cell>{lainaus.asiakasid}</Table.Cell>
                        <Table.Cell>{lainaus.tuotteet.length} tuotetta lainassa</Table.Cell>
                        <Table.Cell>{lainaus.palautuspvm}</Table.Cell>
                        <Table.Cell>{lainaus.myohassa ? <Icon name="close"/>: ''}</Table.Cell>
                        <Table.Cell><Button name="kuittaus"><Icon name="check"/></Button>
                        </Table.Cell>
                    </Table.Row> )} 
                </Table.Body>
            </Table>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state.lendings)
    const currentDate = moment()
    return {
lendings : state
    .lendings
    .sort((a, b) => {
        var dateA = new Date(a.palautuspvm),
            dateB = new Date(b.palautuspvm);
        return dateA - dateB;
    })
    .map( l => {
            return {
                id: l.id,
                alkupvm: moment(l.alkupvm).format('l'),
                asiakasid: l.asiakasid,
                tuotteet: l.tuotteet,
                palautuspvm: moment(l.palautuspvm).format('l'),
                palautettu: l.palautettu ? moment(l.palautettu).format('l') : null,
                myohassa: !l.palautettu && moment(l.palautuspvm).isBefore(currentDate),
                nykyhetki: currentDate.format('l')  
            }
           
        })
    }
}
// //
const ConnectedLendingList = 
    connect(mapStateToProps, 
    { getLendings} )
    (LendingList)
export default ConnectedLendingList
