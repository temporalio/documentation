import React, { type ReactNode } from 'react';
// Package is only meant for the the browser environment,
//  so we import it here to avoid SSR issues
//  (register <temporal-consent-banner> client-side only).
import { OPEN_EVENT } from '@temporalio-web/consent-banner';

interface FooterCopyrightProps {
  readonly copyright: string;
}

const openConsentBanner = () => window.dispatchEvent(new Event(OPEN_EVENT));

export default function FooterCopyright({ copyright }: FooterCopyrightProps): ReactNode {
  return (
    <div className="footer__bottom-row">
      <div
        className="footer__copyright"
        // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: copyright }}
      />
      <button type="button" className="footer__link-item footer__privacy-choices" onClick={openConsentBanner}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 30 14"
          aria-hidden="true"
          focusable="false"
        >
          <g transform="translate(-1275.000000, -200.000000)">
            <g transform="translate(1275.000000, 200.000000)">
              <path d="M7.4,12.8h6.8l3.1-11.6H7.4C4.2,1.2,1.6,3.8,1.6,7S4.2,12.8,7.4,12.8z" fill="#fff" />
              <path
                d="M22.6,0H7.4c-3.9,0-7,3.1-7,7s3.1,7,7,7h15.2c3.9,0,7-3.1,7-7S26.4,0,22.6,0z M1.6,7c0-3.2,2.6-5.8,5.8-5.8h9.9l-3.1,11.6H7.4C4.2,12.8,1.6,10.2,1.6,7z"
                fill="#0066FF"
              />
              <path
                d="M24.6,4c0.2,0.2,0.2,0.6,0,0.8l0,0L22.5,7l2.2,2.2c0.2,0.2,0.2,0.6,0,0.8c-0.2,0.2-0.6,0.2-0.8,0l0,0l-2.2-2.2L19.5,10c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.2-0.6,0-0.8l0,0L20.8,7l-2.2-2.2c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0l2.2,2.2L23.8,4C24,3.8,24.4,3.8,24.6,4z"
                fill="#fff"
              />
              <path
                d="M12.7,4.1c0.2,0.2,0.3,0.6,0.1,0.8l0,0L8.6,9.8C8.5,9.9,8.4,10,8.3,10c-0.2,0.1-0.5,0.1-0.7-0.1l0,0L5.4,7.7c-0.2-0.2-0.2-0.6,0-0.8c0.2-0.2,0.6-0.2,0.8,0l0,0L8,8.6l3.8-4.5C12,3.9,12.4,3.9,12.7,4.1z"
                fill="#0066FF"
              />
            </g>
          </g>
        </svg>
        Your Privacy Choices
      </button>
    </div>
  );
}
