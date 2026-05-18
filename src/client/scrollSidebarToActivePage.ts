// src/clientModules/scrollSidebarToActive.ts
import type { ClientModule } from '@docusaurus/types';

function scrollActiveSidebarLink() {
  // The aria label is the only one that consistently marks the active link
  const activeLink = document.querySelector(
    '.theme-doc-sidebar-container a[aria-current="page"]'
  ) as HTMLElement | null;

  if (!activeLink) return false;

  // Scroll the menu that actually contains this link
  const menu = activeLink.closest('.menu') as HTMLElement | null;
  if (!menu) return false;

  const menuRect = menu.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  const linkTopWithinMenu = linkRect.top - menuRect.top + menu.scrollTop;

  const targetScrollTop = linkTopWithinMenu - menu.clientHeight / 2 + linkRect.height / 2;

  menu.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: 'auto',
  });

  return true;
}

function runWhenReady() {
  let tries = 0;
  const maxTries = 120; // ~2 seconds

  const tick = () => {
    tries++;
    if (scrollActiveSidebarLink() || tries >= maxTries) return;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const module: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    // Skip hash-only changes
    if (previousLocation && location.pathname === previousLocation.pathname) {
      return;
    }

    runWhenReady();
  },
};

export default module;
