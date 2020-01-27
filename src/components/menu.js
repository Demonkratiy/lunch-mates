import React, { Component } from 'react'
import { Input, Menu, Segment, Image } from 'semantic-ui-react'
import styled from 'styled-components'

let BrandName = styled(Menu.Item)`
font-size: 20px;
`

export default class HeaderMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing color='violet' inverted fluid>
          <BrandName Header >Lunch Mates 🍔</BrandName>
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
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/matthew.png' />
              Have a nice lunch Sir Lancelot!
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
