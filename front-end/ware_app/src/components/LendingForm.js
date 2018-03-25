import React from 'react'
import Divider, { Container, Dropdown, Button, 
    Checkbox, Form, Header, Step, 
    Segment, Icon, Grid, List, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux'
import { getCustomers } from '../reducers/customerReducers'
import ProductListForm from './ProductListForm'

class LendingForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            selectedCustomer: null,
            selectedProducts: [],
            selectedProductsAsObjs: [],
            productsSelected: false,
            deadlineDate: null,
            confirmed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.customerSelect = this.customerSelect.bind(this);
    }

    
    handleCustomerChange = (event, data) => {
        this.setState({selectedCustomer: data.value})
    }
    handleProductsChange = (event, data) => {
        this.setState({ selectedProducts: data.value})
        console.log(typeof (data.value), data.value)
        const selectedProductsAsObjs = data.options.filter(x => {
            if(data.value.includes(x.key)) return x
        })
        this.setState({selectedProductsAsObjs})
        console.log("product", selectedProductsAsObjs)
    } 
    componentDidMount(){
        this.props.getCustomers()
    }
    handleChange = (e) => {
        console.log(e.format('L'))
    }
    handleProductSelection = (e) => {
        this.setState({productsSelected: true})
    }
    handleSave = (e) => {
        console.table(this.state)
    }
    handleKuittaus = (e, { checked}) => {
        console.log(e, checked)
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
                                        fluid search selection options={this.props.customers} />
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
                                            fluid search selection
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
                    <Segment.Group>
                        {this.state.user !== null ? <Segment><Icon name="user" />{this.state.selectedCustomer} 
                        </Segment> : ''}
                        <Segment>
                            <ul style={this.state.productsSelected ? { display: 'none'} : {display: ''}}>
                                {this.state.selectedProductsAsObjs.map(p =>
                                    <li key={p.key}>{p.text} {p.kuvaus}</li>)}
                            </ul>
                            <List divided relaxed style={!this.state.productsSelected ? { display: 'none' } : { display: '' }}>
                                {this.state.selectedProductsAsObjs.map(p => 
                                    <ProductListForm product={p} key={p.key} />)}
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
                text: p.nimi + ', ' + p.kuvaus + ' (' + p.koko + ')',
                nimi: p.nimi,
                value: p.id,
                koko: p.koko,
                kpl: p.kpl ? Number(p.kpl): 0,
                kuvaus: p.kuvaus
            }
        })
    }
}

export default connect(
    mapStateToProps,
    { getCustomers }
)(LendingForm)