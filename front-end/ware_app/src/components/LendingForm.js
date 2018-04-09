import React from 'react'
import Divider, { Container, Dropdown, Button,
    Checkbox, Form, Header, Step, Segment,
    Icon,
    Grid,
    List,
    Label,
    Message
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from 'react-redux'
import {getCustomers} from '../reducers/customerReducers'
import {addLending} from '../reducers/lendingReducer'
import ProductListForm from './ProductListForm'

const initialState = {
            startDate: moment(),
            selectedCustomer: null,
            selectedCustomerId: null,
            selectedProducts: [],
            selectedProductsAsObjs: [],
            productsSelected: false,
            deadlineDate: moment().add(5, 'days').format('l'),
            confirmed: false,
            saved: false,
            showMessage: false,
            messageData: {
                success: false,
                warning: false,
                header: '',
                content: ''
            }
        }

class LendingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleDeadlineChange = this
            .handleDeadlineChange
            .bind(this);
        this.customerSelect = this
            .customerSelect
            .bind(this);
        this.updateProduct = this
            .updateProduct
            .bind(this);
    }
    resetState() {
        this.setState(initialState)
    }

    handleCustomerChange = (event, data) => {
        const customer = data
            .options
            .find(x => {
                return data.value === x.text
            })
        console.log(customer)
        this.setState({selectedCustomer: customer.text, selectedCustomerId: customer.key})
    }
    handleProductsChange = (event, data) => {
        this.setState({selectedProducts: data.value})
        const selectedProductsAsObjs = data
            .options
            .filter(x => {
                if (data.value.includes(x.key)) {
                    x.amount = 1 // lukumäärä
                    return x
                }
            })
        this.setState({selectedProductsAsObjs})
    }
    componentDidMount() {
        this
            .props
            .getCustomers()
    }
    handleDeadlineChange = (deadline) => {
        this.setState({
            deadlineDate: moment(deadline).format('l')
        })
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }
    handleSave = (e) => {
        const newLending = {
            products: this
                .state
                .selectedProductsAsObjs
                .map(p => {
                    return {id: p.key, amount: p.amount}
                }),
            customer: this.state.selectedCustomerId,
            deadline: !this.state.deadlineDate ? moment().add(3, 'days').format('YYYY-MM-DD') : this.state.deadlineDate
        }
        this.props.addLending(newLending)

        this.showMessage('', '', 3)
        
    }
    handleKuittaus = (e, {checked}) => {
        this.setState({confirmed: checked})
    }
    customerSelect = (e) => {
        // console.log(e) this.setState({ selectedCustomer:
        // Number(e.currentTarget.value)}) //console.log(this.refs.tags.el)

    }

    activeStep() {
        if (this.state.selectedCustomer === null) {
            return 0
        }
        if (!this.state.productsSelected) {
            return 1
        } else {
            return 2;
        }

    }
    updateProduct(product) {
        const index = this
            .state
            .selectedProductsAsObjs
            .findIndex(p => p.key === product.key)
        const arrayToUpdate = this.state.selectedProductsAsObjs
        arrayToUpdate[index] = product
        this.setState({selectedProductsAsObjs: arrayToUpdate})
        console.table(this.state.selectedProductsAsObjs)
    }
    handleAmount(p) {
        console.log(p)
    }
    getDisplayValue(val) {
        if (this.activeStep() === val) {
            return {display: ''}
        } else {
            return {display: 'none'}
        }
    }
    showMessage(type, content, seconds) {
        const messageData = {
            success: true,
            header: 'Tuotteen tallennus',
            content: 'Tallennus onnistui'
        }
        this.setState({showMessage: true, messageData})

        setTimeout(() => {
            this.setState({showMessage: false })
            setTimeout(() => {
                this.resetState()
            }, 100);
        }, seconds * 1000);

    }
    getCurrentDate() {
        if(!this.state.deadlineDate){
            return moment().format('l')
        }
        else{
            return moment(this.state.deadlineDate).format('l')
        }
    }

    render() {

        const {customers} = this.props
        return (
            <Container>
                <Container>
                    <Header as="h3">Uusi lainaus</Header>
                    <Step.Group ordered fluid>
                        <Step
                            active={this.state.selectedCustomer === null}
                            completed={this.state.selectedCustomer !== null}>
                            <Step.Content>
                                <Step.Title>Asiakas</Step.Title>
                                <Step.Description>{!this.state.selectedCustomer ? 'Valitse asiakas': this.state.selectedCustomer}</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step
                            active={!this.state.productsSelected && this.state.selectedCustomer != null}
                            completed={this.state.selectedProducts.length > 0}>
                            <Step.Content>
                                <Step.Title>Tuotteet</Step.Title>
                                <Step.Description>{this.state.selectedProducts.length === 0 ? 'Valitse tuotteet':
                             this.state.selectedProducts.length + ' tuotetta valittuna' }</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step completed={this.state.saved} active={this.state.productsSelected}>
                            <Step.Content>
                                <Step.Title>Tiedot</Step.Title>
                                <Step.Description>Tilauksen tarkemmat tiedot</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step disabled={true}>
                            <Step.Content>
                                <Step.Title>Palautus</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Container>
                <Container>
                    <Grid stackable columns={1} padded>
                     <DatePicker
                                        dateFormat="l"
                                        value={this.state.deadlineDate}
                                        placeholderText="Palautuspäivä"/>
                        <Grid.Column>
                            <div>
                                <div style={this.getDisplayValue(0)}>
                                    <Dropdown
                                        onChange={this.handleCustomerChange}
                                        value={this.state.selectedCustomer}
                                        placeholder='Valitse asiakas'
                                        search
                                        selection
                                        options={this.props.customers}/>
                                </div>
                                <Form style={this.getDisplayValue(1)} onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>
                                        <Dropdown
                                            size="small"
                                            noResultsMessage="Ei lisättäviä tuotteita"
                                            value={this.state.selectedProducts}
                                            onChange={this.handleProductsChange}
                                            placeholder='Valitse tuotteet'
                                            multiple
                                            search
                                            selection
                                            options={this.props.products}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button
                                            floated="right"
                                            disabled={this.state.selectedProducts.length === 0}
                                            primary
                                            style={this.getDisplayValue(1)}
                                            onClick={this.handleProductSelection}>Lisää tuotteet
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
                <Container>
                    <Segment.Group
                        style={!this.state.productsSelected
                        ? {
                            display: 'none'
                        }
                        : {
                            display: ''
                        }}>
                        {this.state.user !== null
                            ? <Segment><Icon name="user"/>{this.state.selectedCustomer
                                        ? this.state.selectedCustomer
                                        : '-'}
                                </Segment>
                            : ''}
                        <Segment>
                            <ul
                                style={this.state.productsSelected ? { display: 'none' } : { display: ''}}>
                                {this
                                    .state.selectedProductsAsObjs
                                    .map(p => <li key={p.key}>{p.text} {p.description}</li>)}
                            </ul>
                            <List
                                divided
                                relaxed
                                style={!this.state.productsSelected
                                ? {
                                    display: 'none'
                                }
                                : {
                                    display: ''
                                }}>
                                {this
                                    .state
                                    .selectedProductsAsObjs
                                    .map(p => <ProductListForm updateProduct={this.updateProduct} product={p} key={p.key}/>)}
                                {/* handleClick={(e) => this.handleAmount(p)} */}
                            </List>
                            <Segment>
                                <Form.Group>
                                    <Label><Icon name="calendar"/>
                                        Palautuspäivä</Label>
                                    <DatePicker
                                        dateFormat="l"
                                        value={this.state.deadlineDate}
                                        selected={this.state.startDate}
                                        onChange={this.handleDeadlineChange}
                                        placeholderText="Palautuspäivä"/>
                                </Form.Group>
                            </Segment>
                        </Segment>
                        <Segment floated="left">
                            <Form.Field>
                                <Checkbox
                                    toggle
                                    label='Kuitattu'
                                    name='checkboxKuittaus'
                                    checked={this.state.confirmed}
                                    onChange={this.handleKuittaus}/>
                            </Form.Field>
                        </Segment>
                        <Segment floated='right'>
                            {this.state.showMessage
                                ? <Message
                                        success={this.state.messageData.success}
                                        warning={this.state.messageData.warning}
                                        header={this.state.messageData.header}
                                        content={this.state.messageData.content}/>
                                : ''}
                            <Button.Group
                                floated="right"
                                style={!this.state.productsSelected
                                ? {
                                    display: 'none'
                                }
                                : {
                                    display: ''
                                }}>
                                <Button negative><Icon name="remove"/>
                                    Peruuta</Button>
                                {/* <Button.Or text="tai" /> */}
                                <Button><Icon name="edit"/>
                                    Muokkaa</Button>
                                {/* <Button.Or text="tai" /> */}
                                <Button disabled={!this.state.confirmed || this.state.saved} onClick={this.handleSave} positive><Icon name="save"/>
                                    Tallenna</Button>
                            </Button.Group>
                        </Segment>
                    </Segment.Group>

                </Container>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state
            .customers
            .map(c => {
                return {text: `${c.firstname} ${c.lastname}`, key: c.id, value: `${c.firstname} ${c.lastname}`}
            }),
        products: state
            .products
            .map(p => {
                return {
                    key: p.id,
                    text: p.size && p.size.length > 0 ? p.name + ', ' + p.size : p.name,
                    name: p.name,
                    value: p.id,
                    size: p.size,
                    amountinstorage: p.amountInStorage ? Number(p.amountInStorage) : 0, //
                    description: p.description
                }
            })
    }
}

export default connect(mapStateToProps, {getCustomers, addLending})(LendingForm)