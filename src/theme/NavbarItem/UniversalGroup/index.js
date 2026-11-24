import React, { useEffect, useRef } from 'react';
import TemporalNavbarLink from '@site/src/components/TemporalNavbarLink';

export default function UniversalGroup({ label, sections, ctas, mobile = false, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const closeOutside = (event) => {
      if (!ref.current.contains(event.target)) ref.current.open = false;
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  const content = (
    <details
      ref={ref}
      name="universal-navigation"
      className="universal-nav-group"
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === 'mouse') ref.current.open = true;
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === 'mouse') ref.current.open = false;
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) ref.current.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          ref.current.open = false;
          ref.current.querySelector('summary').focus();
          event.stopPropagation();
        }
      }}
      onClick={(event) => {
        if (event.target.closest('a')) {
          ref.current.open = false;
          onClick?.(event);
        }
      }}
    >
      <summary className={mobile ? 'menu__link' : 'navbar__link'}>{label}</summary>
      <ul className="universal-nav-submenu">
        {sections.map((section, index) => (
          <li key={index}>
            {section.title && <span className="universal-nav-section-title">{section.title}</span>}
            <ul className="universal-nav-section">
              {section.links.map((link) => (
                <TemporalNavbarLink key={link.href ?? link.to} {...link} isDropdownItem />
              ))}
            </ul>
          </li>
        ))}
        {ctas.map((cta) => (
          <TemporalNavbarLink key={cta.href ?? cta.to} {...cta} isDropdownItem />
        ))}
      </ul>
    </details>
  );

  return mobile ? (
    <li className="menu__list-item">{content}</li>
  ) : (
    <div className="navbar__item universal-nav-desktop-group">{content}</div>
  );
}
