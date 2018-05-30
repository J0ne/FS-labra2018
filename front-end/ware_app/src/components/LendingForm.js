import React from 'react'
import Divider, { Container, Dropdown, Button,
    Checkbox, Form, Header, Step, Segment,
    Icon, Grid, List, Label, Message, GridColumn, Sticky
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'


import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_green.css'
import { Finnish} from 'flatpickr/dist/l10n/fi.js'
import moment, { locale } from 'moment';
import {connect} from 'react-redux'
import {getCustomers} from '../reducers/customerReducers'
import {addLending} from '../reducers/lendingReducer'
import {toggleSelected, removeFromSelected, updateSelected } from '../reducers/selectionReducer'
import { selectCustomer, removeCustomer} from '../reducers/customerSelectionReducer'
import ProductListForm from './ProductListForm'
import ProductSelector from './ProductSelector'
import ConnectedCustomerSelector from './CustomerSelector'
// datepicker styles
import 'react-datepicker/dist/react-datepicker.css';
const initialState = {
            startDate: moment(),
            selectedCustomer: null,
            selectedProducts: [],
            selectedProductsAsObjs: [],
            productsSelected: false,
            deadlineDate: null,
            confirmed: false,
            saved: false,
            showMessage: false,
            active: 'Lender',
            defaultAmount: 1,
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
        this.updateProduct = this.updateProduct.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleContextRef = contextRef => 
    {
        console.log(contextRef)
        this.setState({ contextRef })
    }

    resetState() {
        this.setState(initialState)
        this.props.removeCustomer(this.props.selectedCustomer)
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
            const selected = this.props.customers
                .find(customer => customer.id === this.props.customerid)
            this.props.selectCustomer(selected)

            if(selected){
                this.setState({active: 'Product'})
            }
        }
    }
    handleDeadlineChange = (data) => {
        console.log('DATE', data.date[0])
        this.setState({
            deadlineDate: moment(data.date[0]).toISOString()
        })
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }
    handleSave = (e) => {
        if(!this.props.selectCustomer){
            this.showMessage('error', 'Lainaajaa ei ole valittuna', 4)
            return;
        }
        const newLending = {
            products: this.props.selectedProducts
                .map(p => {
                    return {id: p.id, amount: p.amount}
                }),
            customer: this.props.selectedCustomer.id,
            deadline: this.state.deadlineDate
        }
        
        this.props.addLending(newLending)
        this.setState({saved: true})
        this.showMessage('', '', 3)

    }
    handleKuittaus = (e, {checked}) => {
        this.setState({confirmed: checked})
    }
    handleStepClick = (e, {id}) => {
        console.log(e, id)
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
    handleAmount = (id) => (e) => {
        console.log(id, e)
        const product = this.props.selectedProducts.find(p => p.id === id)
        product.amount = e.value
        this.props.updateSelected(product)
        this.setState({active: 'Product'})
    }
    
    handleCustomerSelect = (customer) => () => {
        customer.isSelected = true
        this.props.selectCustomer(customer)
    }
    handleSelect = (product) => () => {
        this.props.toggleSelected(product)
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

        const {customers, stickyActive} = this.props
        const { contextRef } = this.state
        const flatpickrOptions = {
            locale: Finnish,
            dateFormat: 'd.m.Y',
            disableMobile: true
        }
        return (
            <Container>
               
                <Container>
                    {this.state.showMessage
                                ? <Message
                                        success={this.state.messageData.success}
                                        warning={this.state.messageData.warning}
                                        header={this.state.messageData.header}
                                        content={this.state.messageData.content}/>
                                : ''}

                    <Header as="h3">Uusi lainaus </Header>
                      <div id="stickyDiv" ref={this.handleContextRef}>
                    <Grid >
                        
                        <Grid.Column width={6}>
                            <Sticky active={stickyActive} context={contextRef}>
                            <Step.Group fluid vertical ordered >
                            <Step id = 'Lender' link active = {this.state.active === 'Lender'}
                                    title = {!this.props.selectedCustomer ? 'Lainaaja' : `${this.props.selectedCustomer.firstname} ${this.props.selectedCustomer.lastname}`
                            }
                                completed={this.props.selectedCustomer !== null} onClick={this.handleStepClick} description={!this.props.selectedCustomer ? 'Valitse lainaaja': ''}
                            />
                            <Step link 
                                    id='Product'
                                    active = {this.state.active === 'Product' && this.props.selectedCustomer !== null
                                    }
                                    completed={this.props.selectedProducts.length > 0}
                                    onClick={this.handleStepClick}
                                    title='Tuotteet'
                                    description={this.props.selectedProducts.length === 0 ? 'Valitse tuotteet':
                                    this.props.selectedProducts.length + ' tuotetta valittuna' }

                                    />
                            <Step id='Summary' link title='Yhteenveto'
                                completed={this.state.confirmed && this.state.deadlineDate !== null }
                                disabled={this.props.selectedProducts.length == 0 ||
                                this.props.selectedCustomer === null}
                                onClick={this.handleStepClick} 
                                description='Palautuspäivä ja kuittaus'
                                active={this.state.active === 'Summary'}>

                            </Step>
                            <Step onClick={this.handleStepClick}
                                disabled={!(this.state.confirmed && this.state.deadlineDate !== null)}
                                completed={this.state.saved}
                                title={<Form.Field>
                                        <Button disabled={!this.state.confirmed || 
                                            this.state.deadlineDate === null || this.state.saved} onClick={this.handleSave} positive><Icon name="save"/>
                                        Tallenna</Button>
                                    </Form.Field>}
                            >
                            </Step>
                        </Step.Group>
                    </Sticky>
                   
                    </Grid.Column>
                     <Grid.Column width={10}>
                        {this.state.active === 'Lender' ? <ConnectedCustomerSelector  toggleCustomer={this.handleCustomerSelect}
                            selectedCustomer={this.props.selectedCustomer}
                            customers={this.props.customers}
                             /> : ''}
                        {this.state.active === 'Product' ? <ProductSelector updateNumberPicker={this.handleAmount} selectProduct={this.handleSelect} />: ''}
                        {this.state.active === 'Summary' ?
                        <Segment>
                            <List divided >
                                {this.props.selectedProducts.map(p =>
                                    <ProductListForm updateProduct={this.updateProduct} product={p} key={p.id}/>)}
                            </List>
                            <Segment>
                            <Form>
                                 <Form.Group widths='equal'>
                                    <Form.Field>
                                        <Checkbox
                                        toggle label='Kuitattu' name='checkboxKuittaus' checked={this.state.confirmed}
                                         onChange={this.handleKuittaus}/>
                                    </Form.Field>
                                    <Form.Field inline>
                                         <Flatpickr value={this.state.deadlineDate}
                                            options={flatpickrOptions} placeholder='Palautuspäivämäärä'
                                          onChange={date => { this.handleDeadlineChange({date}) }} />
                                    </Form.Field >
                                    </Form.Group>
                            </Form>
                            </Segment>
                        </Segment> : ''}
                    </Grid.Column>
                    </Grid>
                     </div>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        customers: state.customers,
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
        selectedProducts: state.selectedProducts,
        selectedCustomer: state.selectedCustomer,
        error: state.error
    }
}

export default connect(mapStateToProps, {getCustomers, addLending,
toggleSelected, removeFromSelected, updateSelected, 
selectCustomer, removeCustomer
})(LendingForm)