import React from 'react'
import { Sidebar, Segment, Responsive, Header, Menu, Label, Input, Container, Button } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
// activeItem, showUserDetails, user, handleItemClick, logIn, logOut
class MenuBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }


getMenuRightContent = () => {
  return  ( 
        <Menu.Menu position='right'>
            {/* <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item> */}
            {this.props.user ?
                <Menu.Item onClick={this.props.showUserDetails}>
                  <div>
                    <Label size="small" as='div' color={this.props.user.admin ? 'red': 'blue'} image>
                        <img src='' />{this.props.user.name}
                          <Label.Detail>{this.props.user.admin ? 'admin': 'peruskäyttäjä'}</Label.Detail>
                    </Label> 
                  </div>
                </Menu.Item>: '' }
                {this.props.user ?  <Menu.Item active={this.props.activeItem === 'logout'} onClick={this.props.logOut}>Kirjaudu ulos</Menu.Item>  : 
                 <Menu.Item name='login' active={this.props.activeItem === 'login'} onClick={this.props.logIn}/> }
          </Menu.Menu>)
}
  render() {
    const {activeItem, visible, showUserDetails, user, handleItemClick, toggleVisibility, logIn, logOut, content} = this.props
    return (
  <div>
  <Responsive {...Responsive.onlyMobile}>
      <Menu fluid>
       <Button icon='content' basic onClick={toggleVisibility} />
        {this.getMenuRightContent()}
      </Menu>
   
    <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} as={Menu} animation='scale down'width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='Lainaukset' as={NavLink} to={"/"} active={activeItem === 'lainaukset'} onClick={handleItemClick} />
            <Menu.Item as={NavLink} to={"/uusilainaus"} active={activeItem === 'uusilainaus'} onClick={handleItemClick}>Uusi lainaus</Menu.Item>
            <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={handleItemClick} />
            <Menu.Item name='Lainaajat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={handleItemClick} />
                      {user && user.admin ? 
            <Menu.Item color="red" name='Admin' as={NavLink} to={"/admin"} active={activeItem === 'admin'} onClick={handleItemClick} />: ''}       
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
                {content}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
  </Responsive>
     <Responsive as={Container} minWidth={768}>
    <Menu stackable={true}>
        <Menu.Item name='Lainaukset' as={NavLink} to={"/"} active={activeItem === 'lainaukset'} onClick={handleItemClick} />
        <Menu.Item as={NavLink} to={"/uusilainaus"} active={activeItem === 'uusilainaus'} onClick={handleItemClick}>Uusi lainaus</Menu.Item>
        <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={handleItemClick} />
        <Menu.Item name='Lainaajat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={handleItemClick} />
         {user && user.admin ? 
         <Menu.Item color="red" name='Admin' as={NavLink} to={"/admin"} active={activeItem === 'admin'} onClick={handleItemClick} />: ''}    
         {this.getMenuRightContent()}   
    </Menu>
  </Responsive>
  </div>
    )
  }
}
export default MenuBar