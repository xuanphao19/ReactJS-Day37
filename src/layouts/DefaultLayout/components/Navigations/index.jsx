import PropTypes from "prop-types";
import { NavLink } from "react-router";
import clsx from "clsx";

import styles from "./Navigation.module.scss";

const Lists = ({ as = "ul", children, className }) => {
  const List = as;
  return <List className={className}>{children}</List>;
};

const Item = ({ as = "li", children, className }) => {
  const NavItem = as;
  return <NavItem className={className}>{children}</NavItem>;
};

const Navigation = ({ routes, className, icExtend }) => {
  const Nav = "nav";

  return (
    <Nav className={clsx(styles.nav)}>
      <Lists as="ul" className={clsx(styles.navlist, className)}>
        {routes.map(({ id, title, url, icon }) => {
          return (
            <Item
              key={id}
              as="li"
              className={clsx(styles.item, { [styles["extend"]]: icExtend })}>
              <NavLink
                {...(url ? { to: `${url}` } : {})}
                className={({ isActive }) =>
                  clsx(styles.link, { [styles.selected]: isActive })
                }>
                {icon && (
                  <span className={clsx(styles["link-icon"])}> {icon} </span>
                )}
                <span className={clsx(styles["text"])}> {title}</span>
              </NavLink>
            </Item>
          );
        })}
      </Lists>
    </Nav>
  );
};

Navigation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
Lists.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.bool,
  as: PropTypes.string,
};
Item.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string | null,
  as: PropTypes.string | null,
};

export default Navigation;
