import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element"> <span>
                            <img alt="image" className="img-circle" src="img/hkartal.jpg" />
                        </span>
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Hatice Kartal</strong>
                                </span> <span className="text-muted text-xs block">Director<b className="caret"></b></span> </span> </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="profile.html">Profile</a></li>
                                <li><a href="contacts.html">Contacts</a></li>
                                <li><a href="mailbox.html">Mailbox</a></li>
                                <li className="divider"></li>
                                <li><a href="#"> Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            IN+
                            </div>
                    </li>
                    <li className={this.activeRoute("/main")} className="main_menu_item">

                        <Link to="/main"><i className="fa fa-th-large"></i> <span className="nav-label">Main view</span></Link>
                    </li>
                    <li className={this.activeRoute("/estimator")} className="main_menu_item">
                        <Link><i className="fa fa-bolt"></i> <span className="nav-label">Estimator</span></Link>
                        <ul className={this.secondLevelActive()}>
                            <li className={this.activeRoute("/projects")}>
                                <Link to="/projects"><i className="fa fa-folder"></i> Projects</Link>
                            </li>
                            <li >
                                <Link to="/phases"><i className="fa fa-hourglass-3"></i> Phases</Link>
                            </li>
                            <li >
                                <Link to="/estimatingfactors"><i className="fa fa-times-rectangle-o"></i> Estimating Factors</Link>
                            </li>
                            <li >
                                <Link to="/inventoryitems"><i className="fa fa-shopping-cart"></i> Inventory Items</Link>
                            </li>
                            <li >
                                <Link to="/parameters"><i className="fa fa-list"></i> Parameters</Link>
                            </li>
                        </ul>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Navigation