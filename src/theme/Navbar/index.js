import React from 'react';
import Navbar from '@theme-original/Navbar';
import SecondaryNav from '@site/src/components/SecondaryNav';
import SdkNav from '@site/src/components/SdkNav';

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <SecondaryNav />
      <SdkNav />
    </>
  );
}
