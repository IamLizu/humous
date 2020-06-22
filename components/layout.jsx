import { useState, useEffect } from 'react'
import { siteTitle, siteTagLine } from '../data/info'
import Link from 'next/link'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './layout.module.css'
import { annotate } from 'rough-notation';
import utilStyles from '../styles/utils.module.css'
import MenuItem from '../components/menuItems.json'


export default function Layout({ children, home }) {
    const [collapsed, setCollapsed] = useState(true)

    const toggleNavMenu = () => setCollapsed(!collapsed)

    useEffect(() => {
        const e = document.getElementById('appHeader');
        const annotation = annotate(e, { type: 'highlight', color: '#fff176' });
        annotation.show();
    })

    return(
        <>
            <header className={styles.container}>
                {home? (
                    <>
                        <Navbar color="faded" light>
                            <NavbarBrand id="appHeader" className={`${styles.frontPageHeader}`}>
                                {siteTitle}
                            </NavbarBrand>
                            <NavbarToggler onClick={toggleNavMenu}/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    {MenuItem.map(({ page, title }) => (
                                        <NavItem key={page}>
                                            <Link href="/[page]" as={page} passHref>
                                                <NavLink>{title}</NavLink>
                                            </Link>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                ) : (
                    <>
                        <Navbar color="faded" light>
                            <Link href="/" >
                                <a id="appHeader" className={utilStyles.navBrand}><p>{siteTitle}</p></a>
                            </Link>
                            <NavbarToggler onClick={toggleNavMenu}/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    {MenuItem.map(({ page, title }) => (
                                        <NavItem key={page}>
                                            <Link href="/[page]" as={`/${page}`} passHref>
                                                <NavLink>{title}</NavLink>
                                            </Link>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                )}
            </header>
            <main> {children} </main>
            <footer className={`${styles.container} ${styles.footer}`}>
                {home? (
                    <div className={utilStyles.spaceBetweenFlex}>
                    <NavbarBrand>
                        <h6 className={`${styles.frontPageHeader}`}>
                            &copy; 2020 &nbsp;{siteTitle}&nbsp;/&nbsp;All Rights Reserved.
                        </h6>
                    </NavbarBrand>
                    <h6>{siteTagLine}</h6>
                </div>
                ) : (
                    <div className={utilStyles.spaceBetweenFlex}>
                        <h6 className={utilStyles.defaultCursor}>
                            &copy; 2020 &nbsp;
                            <Link href="/" passHref>
                                <a className={utilStyles.noundURI}>{siteTitle}</a>
                            </Link>
                            &nbsp;/&nbsp;All Rights Reserved.
                        </h6>
                    <h6>{siteTagLine}</h6>
                </div>
                )}
            </footer>
        </>
    )
}