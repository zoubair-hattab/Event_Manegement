import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Navbar } from 'flowbite-react';
import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/reducers/theme.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

const Header = () => {
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const dispatch = useDispatch();
  const { address } = useAccount();
  return (
    <Navbar className="border-b-2 sticky top-0 z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Event's
        </span>
      </Link>
      <div className="flex gap-1 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        <ConnectButton label="Connect" showBalance={false} />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active={location.pathname == '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        {address && (
          <>
            <Navbar.Link active={location.pathname == '/event'} as={'div'}>
              <Link to="/myevent">My Event</Link>
            </Navbar.Link>
            <Navbar.Link
              active={location.pathname == '/create-event'}
              as={'div'}
            >
              <Link to="/create-event">Create Event</Link>
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
