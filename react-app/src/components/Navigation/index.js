import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import watchboxdIcon from '../../watchboxd-icon.png'
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import { useModal } from '../../context/Modal';
import CreateButton from './CreateButton';
import { useEffect } from 'react';
import { thunkGetCurrentUser } from '../../store/session';
import LoginDropdown from './LoginDropdown';
import SignupDropdown from './SignupDropdown';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const {closeMenu} = useModal();

	return (
		<div className='navbar-container'>
			<div className='navbar-container-itself'>
				<div className='nav-logo-container'>
					<div className='change-cursor logo-navbar' onClick={() => history.push('/')}>
						<img id="site-icon" src={watchboxdIcon}/>
						<h2 id="site-logo">WATCHBOXD</h2>
					</div>
				</div>
				{sessionUser &&isLoaded && (
					<div className='nav-profile-container'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				{!sessionUser &&
				<>
							<div className='nav-profile-account-buttons'>
								<LoginDropdown />
							</div>
							<div className='nav-profile-account-buttons'>
								<SignupDropdown />
							</div>
				</>}
				<div className='nav-films-link'>
					<NavLink to="/films">FILMS</NavLink>
				</div>
				<div className='nav-lists-link'>
					<NavLink to="/lists">LISTS</NavLink>
				</div>
				<div className='nav-members-link'>
					<a to="/members">MEMBERS</a>
				</div>
				{sessionUser && <CreateButton user={sessionUser}/>}
			</div>
		</div>
	);
}

export default Navigation;
