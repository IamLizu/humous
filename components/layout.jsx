import { useState } from 'react'
import { siteTitle } from '../data/about'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import styles from './layout.module.css'

export default function Layout({ children, home }) {
    const [collapsed, setCollapsed] = useState(true)

    const toggleNavMenu = () => setCollapsed(!collapsed)

    return(
        <>

            <header className={styles.container}>
                {home? (
                    <>
                        <Navbar color="faded" light>
                            <NavbarBrand className="mr-auto">{siteTitle}</NavbarBrand>
                            <NavbarToggler onClick={toggleNavMenu} className="mr-2"/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink href="/about/">About</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/submit-post/">Submit Post</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </>
                ) : (
                    <>
                        <Navbar color="faded" light>
                            <NavbarBrand href="/" className="mr-auto">{siteTitle}</NavbarBrand>
                            <NavbarToggler onClick={toggleNavMenu} className="mr-2"/>
                            <Collapse isOpen={!collapsed} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink href="/about/">About</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/submit-post/">Submit Post</NavLink>
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