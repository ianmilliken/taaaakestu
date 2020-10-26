/* eslint-disable no-use-before-define */
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <article className={styles.layout}>
      <aside className={styles.layoutSidebar}>
        <header className={styles.logo}>
          <img src={Logo} alt="StatusCake" />
        </header>
        <nav className={styles.navbar}>
          <h5>SSL Monitoring</h5>
          <NavLink
            exact
            to="/"
            className={styles.navbarLink}
            activeClassName={`${styles.navbarLink} ${styles.navbarLinkActive}`}
          >
            All Tests
          </NavLink>
          <NavLink
            exact
            to="/add-test"
            className={styles.navbarLink}
            activeClassName={`${styles.navbarLink} ${styles.navbarLinkActive}`}
          >
            New SSL Test
          </NavLink>
        </nav>
      </aside>
      <main>{children}</main>
    </article>
  );
};

export default Layout;
