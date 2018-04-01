import React from 'react'
import {connect} from 'react-redux'
import {Icon, Table, Button, Header, Modal} from 'semantic-ui-react'
import moment from 'moment'
import {getLendings} from '../reducers/lendingReducer'

class LendingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            modalContent: null
        }
        // this.openModal = this.openModal.bind(this)
        this.kuittaaPalautetuksi = this.kuittaaPalautetuksi.bind(this)
    }
    kuittaaPalautetuksi = (lainaus) => (e) => {
        console.log(lainaus, e)
        this.setState({modalOpen: true, modalContent: lainaus});
    }
    onClose = () => this.setState({modalOpen: false});

    cancelConfirmation = () => this.setState({modalOpen: false});

    hyväksyKuittaus = () => {
        this.setState({modalOpen: false});
        alert("TODO: tästä kuittaus eteenpäin jne...")
    }

    render() {

        return (
            <div>
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
                        {this
                            .props
                            .lendings
                            .map(lainaus => <Table.Row key={lainaus.id} negative={lainaus.myohassa}>
                                <Table.Cell>{lainaus.id}</Table.Cell>
                                <Table.Cell>{lainaus.alkupvm}</Table.Cell>
                                <Table.Cell>{lainaus.asiakasid}</Table.Cell>
                                <Table.Cell>{lainaus.tuotteet.length} tuotetta lainassa</Table.Cell>
                                <Table.Cell>{lainaus.palautuspvm}</Table.Cell>
                                <Table.Cell>{lainaus.myohassa
                                        ? <Icon name="close"/>
                                        : ''}</Table.Cell>
                                <Table.Cell>
                                    <Button name="kuittaus" onClick={this.kuittaaPalautetuksi(lainaus)}><Icon name="check"/></Button>
                                </Table.Cell>
                            </Table.Row>)}
                    </Table.Body>
                </Table>
                {this.state.modalContent ? 
                <Modal open={this.state.modalOpen} basic size='small'>
    <Header icon='check' content={`Lainauksen ${this.state.modalContent.id} kaikki ${this.state.modalContent.tuotteet.length} tuotetta on palautettu.`} onClose={this.onClose}/>
    <Modal.Content>
      <p>Asiakas on palauttanut kaikki lainaamansa tuotteet. Kuitataan lainaus. </p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={this.cancelConfirmation} >
        <Icon name='remove' /> Peruuta kuittaus
      </Button>
      <Button color='green' inverted onClick={this.hyväksyKuittaus} >
        <Icon name='checkmark' /> Kyllä
      </Button>
    </Modal.Actions>
  </Modal> : <div/> }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state.lendings)
    const currentDate = moment()
    return {
        lendings: state
            .lendings
            .sort((a, b) => {
                var dateA = new Date(a.palautuspvm),
                    dateB = new Date(b.palautuspvm);
                return dateA - dateB;
            })
            .map(l => {
                return {
                    id: l.id,
                    alkupvm: moment(l.alkupvm).format('l'),
                    asiakasid: l.asiakasid,
                    tuotteet: l.tuotteet,
                    palautuspvm: moment(l.palautuspvm).format('l'),
                    palautettu: l.palautettu
                        ? moment(l.palautettu).format('l')
                        : null,
                    myohassa: !l.palautettu && moment(l.palautuspvm).isBefore(currentDate),
                    nykyhetki: currentDate.format('l')
                }

            })
    }
}
// //
const ConnectedLendingList = connect(mapStateToProps, {getLendings})(LendingList)
export default ConnectedLendingList
