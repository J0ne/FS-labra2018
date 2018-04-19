import React from 'react'
import {Image, List, Icon, Container, Header} from 'semantic-ui-react'

const UserList = () => (
    <Container>
    <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content>
        Käyttäjät
      </Header.Content>
    </Header>
     <List selection verticalAlign='middle'>
        <List.Item>
            <Icon name="user"/>
            <List.Content>
                <List.Header>Helen</List.Header>
                Admin
            </List.Content>
        </List.Item>
        <List.Item>
            <Icon name="user"/>
            <List.Content>
                <List.Header>Christian</List.Header>
                Basic
            </List.Content>
        </List.Item>
        <List.Item>
            <Icon name="user"/>
            <List.Content>
                <List.Header>Daniel</List.Header>
                Manager
            </List.Content>
        </List.Item>
    </List>
    </Container>
)

export default UserList