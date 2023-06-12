import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from 'reactstrap';

import user1 from '../../../assets/images/users/user1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../../redux/reducer/Login';
import { RootState } from 'redux/store';
import { toggleOpen } from 'redux/reducer/ToggleSlice';
import { resetProfileData } from 'redux/reducer/Profile';

const Header = () => {
  const defaultImageSrc =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6.webp';
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const profile1 = useSelector((state: RootState) => state?.login?.loginData);
  const profile = useSelector((state: RootState) => state?.profile?.loginData);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const open = useSelector((state: RootState) => state.Toggle);
  const Handletoggle = () => {
    let logopen = isOpen ? false : true;
    setIsOpen(logopen);
  };
  useEffect(() => {
    // Add profile and profile1 to the dependency array
  }, [profile, profile1]);

  const handleToggle = () => {
    dispatch(toggleOpen());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetProfileData());

    router.push('/login');
  };
  return (
    <Navbar color="primary" dark expand="md" className="sticky-top">
      <div className="d-flex align-items-center">
        {!open?.open ? (
          <NavbarBrand href="/" className="d-lg-block">
            AM
            {/* <Image src={LogoWhite} alt="logo" /> */}
          </NavbarBrand>
        ) : (
          // <NavbarBrand href="/" className="d-lg-none">
          //   AM
          //   {/* <Image src={LogoWhite} alt="logo" /> */}
          // </NavbarBrand>
          ''
        )}
        <Button
          color="light"
          size="sm"
          className="d-sm-block d-md-block"
          onClick={handleToggle}
        >
          <i className="bi bi-three-dots-vertical"></i>
        </Button>
      </div>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: '0px' }}>
              <img
                src={
                  profile?.profileImage ||
                  profile1?.profileImage ||
                  defaultImageSrc
                }
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImageSrc;
                }}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <Link style={{ textDecoration: 'none' }} href="/profile">
              <DropdownItem>Profile</DropdownItem>
            </Link>

            <Link style={{ textDecoration: 'none' }} href="/editProfile">
              <DropdownItem>Edit Profile</DropdownItem>
            </Link>

            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <span className="pt-2 p-1 text-light font-weight-bold">
          {' '}
          {profile?.firstName && profile?.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : profile1?.firstName && profile1?.lastName
            ? `${profile1.firstName} ${profile1.lastName}`
            : ''}
        </span>
      </Collapse>
    </Navbar>
  );
};

export default Header;
