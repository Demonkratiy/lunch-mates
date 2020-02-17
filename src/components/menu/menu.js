import React, { Component } from "react";
import { Menu, Image, Dropdown, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import store from "../../store";

class HeaderMenuComponent extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => store.setMenuStateActiveItem(name);
  handleOnWidthUpdate = (e, { width }) => this.setState({ width });

  render() {
    const { width } = this.state;
    const { activeItem } = store.menuState;
    const { name, userPhoto } = store.user;
    const position = width >= 803 ? "left" : "right";

    return (
      <div>
        <Menu
          as="div"
          style={{
            position: "fixed",
            zIndex: 9999,
            backgroundColor: "#433b6b"
          }}
          fixed="top"
          pointing
          inverted
          fluid
        >
          <Responsive
            as={Dropdown}
            maxWidth={802}
            item
            icon="content"
            text="Menu &nbsp;"
          >
            <Dropdown.Menu>
              <Menu.Item
                as={Link}
                to="/view"
                name="view"
                active={activeItem === "view"}
                onClick={this.handleItemClick}
              />
              <Dropdown.Divider />
              <Menu.Item
                as={Link}
                to="/schedule_new"
                name="schedule new"
                active={activeItem === "schedule new"}
                onClick={this.handleItemClick}
              />
              <Dropdown.Divider />
              <Menu.Item
                as={Link}
                to="/participations_history"
                name="participations history"
                active={activeItem === "participations history"}
                onClick={this.handleItemClick}
              />
            </Dropdown.Menu>
          </Responsive>
          <Responsive
            as={Menu.Menu}
            fireOnMount
            onUpdate={this.handleOnWidthUpdate}
            position={position}
          >
            <Menu.Item header>
              <span
                role="img"
                aria-label="hamburger"
                style={{ fontSize: "20px" }}
              >
                Lunch Mates &nbsp; 🍔
              </span>
            </Menu.Item>
          </Responsive>
          <Responsive as={Menu.Menu} minWidth={803} position="left">
            <Menu.Item
              as={Link}
              to="/view"
              name="view"
              active={activeItem === "view"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/schedule_new"
              name="schedule new"
              active={activeItem === "schedule new"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={Link}
              to="/participations_history"
              name="participations history"
              active={activeItem === "participations history"}
              onClick={this.handleItemClick}
            />
          </Responsive>
          <Responsive as={Menu.Item} minWidth={803} position="right">
            <Image avatar src={userPhoto} />
            Have a nice lunch {name}
          </Responsive>
        </Menu>
      </div>
    );
  }
}

const HeaderMenu = observer(HeaderMenuComponent);
export default HeaderMenu;
