import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import styled from 'styled-components'


let BrandName = styled(Menu.Item)`
font-size: 20px;
`

// let CustomMenu = styled(Menu)'
// color: #433b6b;
// '

export default class HeaderMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { userName, userPhoto } = this.props.userData

    return (
      <div>
        <Menu pointing color='violet' inverted fluid>
          <BrandName header >Lunch Mates &nbsp;<span role="img" aria-label="hamburger">🍔</span></BrandName>
          <Menu.Item
            name='view'
            active={activeItem === 'view'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='schedule new'
            active={activeItem === 'schedule new'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='participations history'
            active={activeItem === 'participations history'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Image avatar src={userPhoto} />
              Have a nice lunch {userName}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
