import React from 'react'
import {connect} from 'react-redux'
import {Icon, Table, Button, Header, Modal} from 'semantic-ui-react'
import moment from 'moment'
import {getLendings, markReverted } from '../reducers/lendingReducer'

class LendingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            selectedLending: null
        }

        this.confirmReverted = this.confirmReverted.bind(this)
    }
    confirmReverted = (lainaus) => (e) => {
        this.setState({modalOpen: true, selectedLending: lainaus});
    }
    onClose = () => this.setState({modalOpen: false});

    cancelConfirmation = () => this.setState({modalOpen: false});

    acceptConfirmation = () => {
        this.setState({modalOpen: false});
        const lending = this.convertLending(this.state.selectedLending)
        this.props.markReverted(lending)
        
    }

    convertLending(lending){
        return {
            id: lending.id,
            customer: lending.asiakas,
            products: lending.tuotteet,
            lendingDate: moment(lending.alkupvm, 'DD.MM.YYYY').toISOString(),
            deadline: moment(lending.palautuspvm, 'DD.MM.YYYY').toISOString()
        }
    }

    render() {

        return (
            <div>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Tunnus</Table.HeaderCell>
                            <Table.HeaderCell>Lainauspäivä</Table.HeaderCell>
                            <Table.HeaderCell>Asiakas</Table.HeaderCell>
                            <Table.HeaderCell>Yhteenveto</Table.HeaderCell>
                            <Table.HeaderCell>Palautuspäivä</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Kuittaus</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {this
                            .props.lendings
                                .map(lainaus => 
                                <Table.Row key={lainaus.id} positive={lainaus.palautettu != null} negative={!lainaus.palautettu && lainaus.myohassa}>
                                    <Table.Cell>{lainaus.id}</Table.Cell>
                                    <Table.Cell>{lainaus.alkupvm}</Table.Cell>
                                    <Table.Cell>{lainaus.asiakas.firstname} {lainaus.asiakas.lastname}</Table.Cell>
                                    <Table.Cell>{lainaus.tuotteet.length} tuotetta lainassa</Table.Cell>
                                    <Table.Cell>{lainaus.palautuspvm}</Table.Cell>
                                    <Table.Cell>{lainaus.myohassa
                                        ? <Icon name="close"/> : <Icon name="check"/>}</Table.Cell>
                                    <Table.Cell>
                                        {lainaus.palautettu!= null ? '' :  <Button size="tiny" color='teal' name="kuittaus" onClick={this.confirmReverted(lainaus)}><Icon name="check"/></Button> }
                                    </Table.Cell>
                            </Table.Row>)}
                    </Table.Body>
                </Table>
                {this.state.selectedLending ? 
                <Modal open={this.state.modalOpen} basic size='small'>
                    <Header icon='check' content={`Lainauksen ${this.state.selectedLending.id} kaikki ${this.state.selectedLending.tuotteet.length} tuotetta on palautettu.`} onClose={this.onClose}/>
                    <Modal.Content>
                        <p>Asiakas on palauttanut kaikki lainaamansa tuotteet. Kuitataan lainaus. </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={this.cancelConfirmation} >
                            <Icon name='remove' /> Peruuta kuittaus
                         </Button>
                        <Button color='green' inverted onClick={this.acceptConfirmation} >
                            <Icon name='checkmark' /> Kyllä
                        </Button>
                    </Modal.Actions>
                </Modal> : <div/> }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const currentDate = moment()
    return {
        lendings: state.lendings
            .sort((a, b) => {
                var dateA = new Date(a.deadline),
                    dateB = new Date(b.deadline);
                return dateA - dateB;
            })
            .sort(a => a.palautettu ? 1 : 0)
            .map(l => {
                return {
                    id: l.id,
                    alkupvm: moment(l.lendingDate).format('l'),
                    asiakas: l.customer,
                    tuotteet: l.products,
                    palautuspvm: moment(l.deadline).format('l'),
                    palautettu: l.revertedDate
                        ? moment(l.revertedDate).format('l')
                        : null,
                    myohassa: !l.revertedDate && moment(l.deadline).isBefore(currentDate),
                    nykyhetki: currentDate.format('l')
                }

            })
    }
}
// //
const ConnectedLendingList = connect(mapStateToProps, { getLendings, markReverted })(LendingList)
export default ConnectedLendingList
