import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';


import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { ReactComponent as Logo} from '../../assets/084 crown.svg'

import './header.styles.scss'

const Header = ({ currentUser, hidden,signOutStart }) => (
    <div className="header">
        <Link className='logo-container' to="/">
        <Logo className='logo'/>
        </Link>
        <div className="options">
            <Link className='option' to='/shop'>
               SHOP
            </Link>
            {
                currentUser ?
                <div className="option" onClick ={signOutStart}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null :
            <CartDropdown/>
        }
        
    </div>

)

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
   hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);