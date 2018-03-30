import React from 'react'
import Divider, { Container, Dropdown, Button, 
    Checkbox, Form, Header, Step, 
    Segment, Icon, Grid, List, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux'
import { getCustomers } from '../reducers/customerReducers'
import { addLending } from '../reducers/lendingReducer'
import ProductListForm from './ProductListForm'
class LendingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            selectedCustomer: null,
            selectedCustomerId: null,
            selectedProducts: [],
            selectedProductsAsObjs: [],
            productsSelected: false,
            deadlineDate: null,
            confirmed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.customerSelect = this.customerSelect.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    
    handleCustomerChange = (event, data) => {
        const customer = data.options.find(x => {return data.value === x.text})
        console.log(customer)
        this.setState({ selectedCustomer: customer.text, selectedCustomerId: customer.key })
    }
    handleProductsChange = (event, data) => {
        this.setState({ selectedProducts: data.value})
        const selectedProductsAsObjs = data.options.filter(x => {
            if(data.value.includes(x.key)) {
                x.lkm = 1 // lukumäärä
                return x
            }
        })
        this.setState({selectedProductsAsObjs})
    } 
    componentDidMount(){
        this.props.getCustomers()
    }
    handleChange = (e) => {
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }
    handleSave = (e) => {
        console.log(this.state)
        const newLending = {
            tuotteet: this.state.selectedProductsAsObjs.map( p => { return {id: p.key, kpl: p.lkm}}),
            asiakasid: this.state.selectedCustomerId,
            alkupvm: moment().format('YYYY-MM-DD'),
            palautettu: null,
            palautuspvm: '2018-04-04'
        }
        this.props.addLending(newLending)
    }
    handleKuittaus = (e, { checked}) => {
        this.setState({confirmed:  checked})
    }
    customerSelect = (e) => {
        // console.log(e)
        // this.setState({ selectedCustomer: Number(e.currentTarget.value)})
        // //console.log(this.refs.tags.el)

    }

    activeStep(){
        if(this.state.selectedCustomer === null){
            return 0 
        }
        if (!this.state.productsSelected) {
            return 1
        }
        else{
            return 2;
        }

    }
    updateProduct(product){
        const index = this.state.selectedProductsAsObjs.findIndex(p => p.key=== product.key)
        const arrayToUpdate = this.state.selectedProductsAsObjs
        arrayToUpdate[index] = product
        this.setState({ selectedProductsAsObjs: arrayToUpdate})
        console.table(this.state.selectedProductsAsObjs)
    }
    handleAmount(p){
        console.log(p)
    }
    getDisplayValue(val){
        if (this.activeStep() === val){
            return {display: ''}
        }
        else {
            return {display: 'none'}
        }
    }

    render() {
        
        const { customers } = this.props
        return (
        <Container>
            <Container>
                <Header as="h3">Uusi lainaus</Header>
                    <Step.Group ordered fluid>
                    <Step active={this.state.selectedCustomer === null}
                    completed={this.state.selectedCustomer !== null} >
                        <Step.Content>
                            <Step.Title>Asiakas</Step.Title>
                            <Step.Description>Valitse asiakas</Step.Description>
                        </Step.Content>
                    </Step>

                        <Step active={!this.state.productsSelected && this.state.selectedCustomer != null}
                        completed={this.state.selectedProducts.length > 0}>
                        <Step.Content>
                            <Step.Title>Tuoteet</Step.Title>
                            <Step.Description>Valitse tuotteet</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step active={this.state.productsSelected}>
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
                        <Grid.Column>
                            <div>
                                <div style={this.getDisplayValue(0)}>
                                    <Dropdown
                                        onChange={this.handleCustomerChange}
                                        value={this.state.selectedCustomer}
                                        placeholder='Valitse asiakas'
                                        search selection options={this.props.customers} />
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
                                            search selection
                                            options={this.props.products} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button floated="right" disabled={this.state.selectedProducts.length === 0} primary style={this.getDisplayValue(1)}
                                            onClick={this.handleProductSelection}>Lisää tuotteet</Button>
                                    </Form.Group>
                                </Form>
                                {/* <div style={this.getDisplayValue(1)}>
                                    <Dropdown
                                        size="small"
                                        noResultsMessage="Ei lisättäviä tuotteita"
                                        value={this.state.selectedProducts}
                                        onChange={this.handleProductsChange}
                                        placeholder='Valitse tuotteet'
                                        multiple
                                        fluid search selection
                                        options={this.props.products} />
                                </div> */}
                                <div style={this.getDisplayValue(2)}>
                                    {/* <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        placeholderText="Palautuspäivä" /> */}
                                </div>

                            </div>   
                        </Grid.Column>
                    </Grid>
        </Container>
        <Container>
                    <Segment.Group style={!this.state.productsSelected ? { display: 'none' } : { display: '' }}>
                        {this.state.user !== null ? <Segment><Icon name="user" />{ this.state.selectedCustomer ? this.state.selectedCustomer : '-'} 
                        </Segment> : ''}
                        <Segment>
                            <ul style={this.state.productsSelected ? { display: 'none'} : {display: ''}}>
                                {this.state.selectedProductsAsObjs.map(p =>
                                    <li key={p.key}>{p.text} {p.kuvaus}</li>)}
                            </ul>
                            <List divided relaxed style={!this.state.productsSelected ? { display: 'none' } : { display: '' }}>
                                {this.state.selectedProductsAsObjs.map(p => 
                                    <ProductListForm updateProduct={this.updateProduct} product={p} key={p.key} />)}
                                {/* handleClick={(e) => this.handleAmount(p)} */}
                            </List>
                                    
                        </Segment>
                        <Segment floated="left">
                            <Form.Field>
                                <Checkbox
                                    toggle
                                    label='Kuitattu'
                                    name='checkboxKuittaus'
                                    checked={this.state.confirmed}
                                    onChange={this.handleKuittaus}
                                />
                            </Form.Field>
                        </Segment>
                        <Segment floated='right'>
                           
                            <Button.Group floated="right" style={!this.state.productsSelected ? { display: 'none' } : { display: '' }} >
                                <Button negative><Icon name="remove" /> Peruuta</Button>
                                {/* <Button.Or text="tai" /> */}
                                <Button><Icon name="edit" /> Muokkaa</Button>
                                {/* <Button.Or text="tai" /> */}
                                <Button disabled={!this.state.confirmed} onClick={this.handleSave} positive><Icon name="save" /> Tallenna</Button>
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
        customers: state.customers.map(c => {
            return {
                text: `${c.etunimi} ${c.sukunimi}`,
                key: c.id,
                value: `${c.etunimi} ${c.sukunimi}`
            } 
        } ),
        products: state.products.map(p => { 
            return {
                key: p.id,
                text: p.nimi + ', ' + p.kuvaus,
                nimi: p.nimi,
                value: p.id,
                koko: p.koko,
                varastossakpl: p.kpl ? Number(p.kpl): 0, //
                kuvaus: p.kuvaus
            }
        })
    }
}

export default connect(
    mapStateToProps,
    { getCustomers, addLending}
)(LendingForm)