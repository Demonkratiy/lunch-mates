import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import styled from 'styled-components'
import store from './store'


let BrandName = styled(Menu.Item)`
font-size: 20px;
`

// let CustomMenu = styled(Menu)'
// color: #433b6b;
// '

class HeaderMenuComponent extends Component {
  state = { activeItem: 'view' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { name, userPhoto } = store.user

    return (
      <div>
        <Menu style={{position: 'fixed', zIndex: 9999}} pointing color='violet' inverted fluid>
          <BrandName header >Lunch Mates &nbsp;<span role="img" aria-label="hamburger">🍔</span></BrandName>
          <Menu.Item
            as={Link} to='/view'
            name='view'
            active={activeItem === 'view'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/schedule_new'
            name='schedule new'
            active={activeItem === 'schedule new'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link} to='/participations_history'
            name='participations history'
            active={activeItem === 'participations history'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Image avatar src={userPhoto} />
              Have a nice lunch {name}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const HeaderMenu = observer(HeaderMenuComponent);
export default HeaderMenu;
