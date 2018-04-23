import React from 'react'
import {Grid, Image} from 'semantic-ui-react'
import UserList from './UserList'
import CustomerList from './CustomerList'
import CategoryForm from './CategoryForm'

const AdminView = () => (
    <Grid columns={3} divided>
        <Grid.Row>
            <Grid.Column>
                <UserList />    
            </Grid.Column>
            <Grid.Column>
                <CustomerList />
            </Grid.Column>
            <Grid.Column>
                <CategoryForm />
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores assumenda deleniti tempora quasi dolorum corporis magnam in. Suscipit corporis, est dolorem facere excepturi quo iure eaque maxime consectetur ea illum?
            </Grid.Column>
            <Grid.Column>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores assumenda deleniti tempora quasi dolorum corporis magnam in. Suscipit corporis, est dolorem facere excepturi quo iure eaque maxime consectetur ea illum?
            </Grid.Column>
            <Grid.Column>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores assumenda deleniti tempora quasi dolorum corporis magnam in. Suscipit corporis, est dolorem facere excepturi quo iure eaque maxime consectetur ea illum?
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AdminView