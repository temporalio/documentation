import React from 'react';
import { ThemeClassNames, useThemeConfig } from '@docusaurus/theme-common';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';

function NavbarItems({ items }) {
  return items.map((item, index) => <NavbarItem key={index} {...item} />);
}

export default function NavbarContent() {
  const { navbar } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const [leftItems, rightItems] = splitNavbarItems(navbar.items);
  const docsControls = rightItems.filter((item) => item.type === 'custom-askAI');
  const actions = rightItems.filter((item) => item.type !== 'custom-askAI');

  return (
    <div className="navbar__inner">
      <div className={`${ThemeClassNames.layout.navbar.containerLeft} navbar__items`}>
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        <NavbarLogo />
        <div className="universal-nav-links">
          <NavbarItems items={leftItems} />
        </div>
      </div>
      <div className={`${ThemeClassNames.layout.navbar.containerRight} navbar__items navbar__items--right`}>
        <NavbarSearch className="universal-nav-search">
          <SearchBar />
        </NavbarSearch>
        <NavbarColorModeToggle className="universal-nav-theme-toggle" />
        <NavbarItems items={docsControls} />
        <NavbarItems items={actions} />
      </div>
    </div>
  );
}
