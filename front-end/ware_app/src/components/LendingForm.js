import React from 'react'
import Divider, { Container, Dropdown, Button,
    Checkbox, Form, Header, Step, Segment,
    Icon, Grid, List, Label, Message, GridColumn, Sticky
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import {connect} from 'react-redux'
import {getCustomers} from '../reducers/customerReducers'
import {addLending} from '../reducers/lendingReducer'
import {toggleSelected, removeFromSelected, updateSelected } from '../reducers/selectionReducer'
import ProductListForm from './ProductListForm'
import ProductSelector from './ProductSelector'
import CustomerSelector from './CustomerSelector'
// datepicker styles
import 'react-datepicker/dist/react-datepicker.css';
const initialState = {
            startDate: moment(),
            selectedCustomer: null,
            selectedCustomerId: null,
            selectedProducts: [],
            selectedProductsAsObjs: [],
            productsSelected: false,
            deadlineDate: moment().add(3, 'days'),
            confirmed: false,
            saved: false,
            showMessage: false,
            active: 'Lender',
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
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this)
        this.customerSelect = this.customerSelect.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleContextRef = contextRef => this.setState({ contextRef })
    resetState() {
        this.setState(initialState)
    }

    handleCustomerChange = (event, data) => {
        const customer = data
            .options.find(x => {
                return data.value === x.text
            })
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
    componentWillMount() {
         this.props.getCustomers()
    }
    componentDidMount() {

        if(this.props.customers.length > 0 && this.props.customerid){
            console.log(this.props.customerid)
            const selected = this.props.customers
                .find(customer => customer.key === this.props.customerid)
            this.setState({selectedCustomer: selected.text, selectedCustomerId: selected.key})
        }
    }
    handleDeadlineChange = (deadline) => {
        this.setState({
            deadlineDate: moment(deadline)
        })
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }
    handleSave = (e) => {
        const newLending = {
            products: this.state.selectedProductsAsObjs
                .map(p => {
                    return {id: p.id, amount: p.amount}
                }),
            customer: this.state.selectedCustomerId,
            deadline: this.state.deadlineDate
        }
        this.props.addLending(newLending)

        this.showMessage('', '', 3)
        
    }
    handleKuittaus = (e, {checked}) => {
        this.setState({confirmed: checked})
    }
    customerSelect = (e) => {

    }
    handleStepClick = (e, {id}) => {
        console.log(id)
        this.setState({active: id})}
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
        console.log(product)
        const index = this.state.selectedProductsAsObjs.findIndex(p => p.key === product.key)
        const arrayToUpdate = this.state.selectedProductsAsObjs
        arrayToUpdate[index] = product
        //this.setState({selectedProductsAsObjs: arrayToUpdate})
        this.props.updateSelected(product)
    }
    handleAmount(p) {
    }
    handleSelect = (product) => () => {
        this.props.toggleSelected(product)
        // const selectedProductsAsObjs = [...this.state.selectedProductsAsObjs, {...product}]
        // console.log(selectedProductsAsObjs)
        // this.setState({selectedProductsAsObjs})
        // console.log(this.state.selectedProductsAsObjs)
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
    render() {

        const {customers} = this.props
        const { contextRef } = this.state
        return (
            <Container>
                 <div ref={this.handleContextRef}>
                <Container>
                    <Header as="h3">Uusi lainaus </Header>
                    <Grid >
                        
                           <Grid.Column width={6}>
                            <Sticky context={contextRef}>
                            <Step.Group fluid vertical ordered>
                            <Step id = 'Lender'
                            link active = {
                                this.state.active === 'Lender' || this.state.selectedCustomer === null
                            }
                            title={!this.state.selectedCustomer ? 'Lainaaja': this.state.selectedCustomer}
                            completed={this.state.selectedCustomer !== null}
                            onClick={this.handleStepClick}
                            description={!this.state.selectedCustomer ? 'Valitse lainaaja': ''}
                            />
                            <Step link 
                                    id='Product'
                                    active={this.state.active === 'Product'}
                                    completed={this.props.selectedProducts.length > 0}
                                    onClick={this.handleStepClick}
                                    title='Tuotteet'
                                    description={this.props.selectedProducts.length === 0 ? 'Valitse tuotteet':
                                    this.props.selectedProducts.length + ' tuotetta valittuna' }

                                    />
                            <Step id='Summary' link onClick={this.handleStepClick} completed={this.state.saved} active={this.state.active === 'Summary'}>
                            <Step.Content>
                                <Step.Title>Yhteenveto</Step.Title>
                                <Step.Description></Step.Description>
                            </Step.Content>
                            </Step>
                            <Step onClick={this.handleStepClick}>
                            <Step.Content>
                                    <Step.Title>Vahvistus</Step.Title>
                               
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Sticky>
                   
                    </Grid.Column>
                     <Grid.Column width={10}>
                        {this.state.active === 'Lender' ? <CustomerSelector 
                            selectedCustomer={this.state.selectedCustomer} customers={this.props.customers}
                            handleRemove={() => this.setState({selectedCustomer: null})} 
                            handleCustomerChange={this.handleCustomerChange} /> : ''
                        }
                        {this.state.active === 'Product' ? <ProductSelector selectProduct={this.handleSelect} />: ''}
                        {this.state.active === 'Summary' ?
                            <List divided relaxed>
                                {this.props.selectedProducts.map(p =>
                                    <ProductListForm updateProduct={this.updateProduct} product={p} key={p.id}/>)}
                            </List> : ''}
                    </Grid.Column>
                    </Grid>
                   
                </Container>

                <Container>
                    <Grid stackable columns={1} padded>
                        <Grid.Column>
                            <div>
                               
                                <Form style={this.getDisplayValue(1)} onSubmit={this.handleSubmit}>
                                    <Form.Group widths='equal'>

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
                     {this.state.showMessage
                                ? <Message
                                        success={this.state.messageData.success}
                                        warning={this.state.messageData.warning}
                                        header={this.state.messageData.header}
                                        content={this.state.messageData.content}/>
                                : ''}
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
                                    .map(p => <li key={p.id}>{p.text} {p.description}</li>)}
                            </ul>
                            <List divided relaxed style={!this.state.productsSelected ? { display: 'none' } : { display: '' }}>
                                {this.state.selectedProductsAsObjs.map(p => <ProductListForm updateProduct={this.updateProduct} product={p} key={p.id}/>)}
                            </List>
                            <Segment>
                                <Form.Group>
                                    <Label><Icon name="calendar"/>
                                        Palautuspäivä</Label>
                                    <DatePicker
                                        dateFormat="DD.MM.YYYY"
                                        selected={this.state.deadlineDate}
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
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state
            .customers.map(c => {
                return {text: `${c.firstname} ${c.lastname}`, key: c.id, value: `${c.firstname} ${c.lastname}`}
            }),
        products: state
            .products.map(p => {
                return {
                    key: p.id,
                    text: p.size && p.size.length > 0 ? p.name + ', koko: ' + p.size : p.name,
                    name: p.name,
                    value: p.id,
                    size: p.size,
                    amountinstorage: p.amountInStorage ? Number(p.amountInStorage) : 0, //
                    amount: 0
                    // description: p.description
                }
            }),
        selectedProducts: state.selectedProducts
    }
}

export default connect(mapStateToProps, {getCustomers, addLending,
toggleSelected, removeFromSelected, updateSelected
})(LendingForm)