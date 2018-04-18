import React from 'react'
import { Menu, Label, Input } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

const MenuBar = ({ activeItem, showUserDetails, user, handleItemClick, logIn, logOut}) => (
    <Menu stackable={true}>
        <Menu.Item name='Lainaukset' as={NavLink} to={"/"} active={activeItem === 'lainaukset'} onClick={handleItemClick} />
        <Menu.Item name='Uusi lainaus' as={NavLink} to={"/uusilainaus"} active={activeItem === 'uusilainaus'} onClick={handleItemClick} />
        <Menu.Item name='Varasto' as={NavLink} to={"/varasto"} active={activeItem === 'Varasto'} onClick={handleItemClick} />
        <Menu.Item name='Asiakkaat' as={NavLink} to={"/asiakkaat"} active={activeItem === 'Asiakkaat'} onClick={handleItemClick} />
         {user && user.admin ? 
         <Menu.Item color="red" name='Admin' as={NavLink} to={"/admin"} active={activeItem === 'admin'} onClick={handleItemClick} />: ''}       
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            {user ?
                <Menu.Item onClick={showUserDetails}>
                  <div>
                    <Label size="small" as='div' color={user.admin ? 'red': 'blue'} image>
                        <img src='' />{user.name}
                          <Label.Detail>{user.admin ? 'admin': 'peruskäyttäjä'}</Label.Detail>
                    </Label> 
                  </div>
                </Menu.Item>: '' }
                {user ?  <Menu.Item name='logout' active={activeItem === 'logout'} onClick={logOut} />  : 
                 <Menu.Item name='login' active={activeItem === 'login'} onClick={logIn}/> }
          </Menu.Menu>
    </Menu>
)

export default MenuBar