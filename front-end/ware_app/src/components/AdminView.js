import React from 'react'
import {Grid, Image} from 'semantic-ui-react'
import UserList from './UserList'
import CustomerList from './CustomerList'
import CategoryForm from './CategoryForm'
import ProductSet from './ProductSetForm'

const AdminView = () => (
    <Grid columns={2} divided>
        <Grid.Row>
            <Grid.Column>
                <CategoryForm />
            </Grid.Column>
            <Grid.Column>
                <ProductSet />
            </Grid.Column>
        </Grid.Row>
         <Grid.Row>
             <Grid.Column>
                <UserList />
            </Grid.Column>
            <Grid.Column>
                <CustomerList />
            </Grid.Column>
            </Grid.Row>
    </Grid>
)

export default AdminView