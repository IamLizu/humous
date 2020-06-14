import { useState, useEffect } from 'react'
import { siteTitle } from '../data/about'
import Link from 'next/link'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './layout.module.css'
import { annotate } from 'rough-notation';


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
                            <NavbarBrand id="appHeader" className={`mr-auto ${styles.frontPageHeader}`}>
                                {siteTitle}
                            </NavbarBrand>
                            <NavbarToggler onClick={toggleNavMenu} className="mr-2"/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <Link href="/about/" passHref>
                                            <NavLink>About</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link href="/submit-post/" passHref>
                                            <NavLink>Submit Post</NavLink>
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                ) : (
                    <>
                        <Navbar color="faded" light>
                            <Link href="/" passHref>
                                <NavbarBrand id="appHeader" className="mr-auto">
                                    {siteTitle}
                                </NavbarBrand>
                            </Link>
                            <NavbarToggler onClick={toggleNavMenu} className="mr-2"/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <Link href="/about/" passHref>
                                            <NavLink>About</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link href="/submit-post/" passHref>
                                            <NavLink>Submit Post</NavLink>
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                )}
            </header>
            <main> {children} </main>
        </>
    )
}