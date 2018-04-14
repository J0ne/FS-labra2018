import React from 'react'
import {Image, List, Icon, Container, Header} from 'semantic-ui-react'

const CustomerList = () => (
    <Container>
        <Header as='h2' icon textAlign='center'>
      <Icon name='id card outline' circular />
      <Header.Content>
        Asiakkaat
      </Header.Content>
    </Header>
      <List selection verticalAlign='middle'>
        <List.Item>
            <Icon name="user" />
            <List.Content>
                <List.Header>Helen</List.Header>
            </List.Content>
        </List.Item>
        <List.Item>
              <Icon name="user" />
            <List.Content>
                <List.Header>Christian</List.Header>
            </List.Content>
        </List.Item>
        <List.Item>
              <Icon name="user" />
            <List.Content>
                <List.Header>Daniel</List.Header>
            </List.Content>
        </List.Item>
    </List>
    </Container>
)


export default CustomerList