'use client';

import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';

function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 ">
      <div className="max-w-7xl w-full text-center mx-auto">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="self-center whitespace-nowrap  text-sm sm:text-xl font-semibold dark:text-white "
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Event's
            </span>
          </Link>
          <Footer.LinkGroup className="mt-3 md:mt-0">
            <Footer.Link>About</Footer.Link>
            <Footer.Link>Privacy Policy</Footer.Link>
            <Footer.Link>Licensing</Footer.Link>
            <Footer.Link>Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          by="Event Manegement"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}
export default FooterCom;
