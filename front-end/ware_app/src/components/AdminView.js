import React from 'react'
import {Grid, Image} from 'semantic-ui-react'
import UserList from './UserList'
import CustomerList from './CustomerList'

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
                TODO
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column>
               
            </Grid.Column>
            <Grid.Column>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores assumenda deleniti tempora quasi dolorum corporis magnam in. Suscipit corporis, est dolorem facere excepturi quo iure eaque maxime consectetur ea illum?
                Ea distinctio recusandae molestiae libero eius magni, earum voluptatem est cum quam ullam ipsam impedit, commodi, obcaecati beatae laudantium suscipit placeat architecto labore eum. Corporis quasi nostrum ipsum maxime odio?
                Ea et facere animi, labore earum dolorem. 
            </Grid.Column>
            <Grid.Column>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores assumenda deleniti tempora quasi dolorum corporis magnam in. Suscipit corporis, est dolorem facere excepturi quo iure eaque maxime consectetur ea illum?
                Ea distinctio recusandae molestiae libero eius magni, earum voluptatem est cum quam ullam ipsam impedit, commodi, obcaecati beatae laudantium suscipit placeat architecto labore eum. Corporis quasi nostrum ipsum maxime odio?
                Ea et facere animi, labore earum dolorem. 
            </Grid.Column>
        </Grid.Row>
    </Grid>
)

export default AdminView