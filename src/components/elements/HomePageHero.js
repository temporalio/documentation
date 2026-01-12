import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SdkLogosAsBlocks } from './SdkLogosAsBlocks';
import '../../css/homepage-hero.css';

const Icon = ({ src, alt, className, width, height }) => {
  const darkSrc = src;
  const lightSrc = src.replace('.svg', '-dark.svg');

  return (
    <>
      <img
        src={useBaseUrl(darkSrc)}
        alt={alt}
        className={`icon-dark-mode ${className || ''}`}
        width={width}
        height={height}
      />
      <img
        src={useBaseUrl(lightSrc)}
        alt={alt}
        className={`icon-light-mode ${className || ''}`}
        width={width}
        height={height}
      />
    </>
  );
};

const HomePageHero = () => {
  const quickstartLinks = [
    {
      path: '/develop/go/set-up-your-local-go',
      name: 'Go Quickstart',
    },
    {
      path: '/develop/java/set-up-your-local-java',
      name: 'Java Quickstart',
    },
    {
      path: '/develop/python/set-up-your-local-python',
      name: 'Python Quickstart',
    },
    {
      path: '/develop/typescript/set-up-your-local-typescript',
      name: 'TypeScript Quickstart',
    },
    {
      path: '/develop/dotnet/set-up-your-local-dotnet',
      name: '.NET Quickstart',
    },
    {
      path: '/develop/ruby/set-up-local-ruby',
      name: 'Ruby Quickstart',
    },
  ];

  const actionCards = [
    {
      href: '/quickstarts',
      icon: <Icon src="/img/icons/Lightning.svg" alt="Lightning icon" />,
      title: 'Quickstart',
      description: 'Setup your local and run a Hello World workflow.',
    },
    {
      href: '/develop',
      icon: <Icon src="/img/icons/Code.svg" alt="Code icon" />,
      title: 'Developer Guide',
      description: 'Dive into everything you need to know about building Temporal workflows.',
    },
    {
      href: '/production-deployment',
      icon: <Icon src="/img/icons/Rocket.svg" alt="Rocket icon" />,
      title: 'Deploy your Workflows',
      description:
        'Deploy your Temporal Application to your environment. Self-Host the Temporal Service or use Temporal Cloud.',
    },
    {
      href: 'https://temporal.io/cloud',
      icon: <Icon src="/img/icons/Cloud.svg" alt="Cloud icon" />,
      title: 'Get started for free with $1000 in credits',
      description:
        '<span class="linkify">Sign up for Temporal Cloud</span> and let us host the Temporal Service for you.',
    },
  ];

  const communityCards = [
    {
      href: 'https://temporal.io/slack',
      icon: <Icon src="/img/icons/Slack.svg" alt="Slack" />,
      title: 'Slack Community',
      description:
        'Join us on <a href="https://temporal.io/slack">temporal.io/slack</a> and say hi or ask us a question.',
    },
    {
      href: 'https://community.temporal.io',
      icon: <Icon src="/img/icons/Message.svg" alt="Message" />,
      title: 'Developer Forum',
      description: '<a href="https://community.temporal.io">Find out</a> if your question has already been asked.',
    },
    {
      href: 'https://learn.temporal.io/courses/',
      icon: <Icon src="/img/icons/Education.svg" alt="Education" />,
      title: 'Learn it all',
      description: '<a href="https://learn.temporal.io/courses/">Master Temporal</a> with our courses and tutorials.',
    },
  ];

  return (
    <div className="homepage-hero-wrapper">
      <div className="hero-main-title-container">
        <header className="hero-main-title">Temporal Docs</header>

        <div className="quickstart-links">{SdkLogosAsBlocks()}</div>
      </div>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Build applications that never fail</h1>
          <p>
            Temporal is an open-source platform for building reliable applications. Temporal delivers crash-proof
            execution by guaranteeing that applications resume exactly where they left off after crashes, network
            failures, or infrastructure outages, whether that happens seconds, days, or even years later.
          </p>
          <p>
            Temporal enables developers to focus on building features that drive the business while ensuring that
            mission-critical processes such as order fulfillment, customer onboarding, and payment processing never fail
            or disappear, regardless of what goes wrong.
          </p>
          <a href="/quickstarts" className="hero-cta">
            Quickstart
            <svg fill="none" height="18" viewBox="0 0 21 18" width="21" xmlns="http://www.w3.org/2000/svg">
              <path d="m20.1094 9.5625-7.1719 7.2187-.7969.7969-1.5937-1.5937.7969-.7969 5.25-5.29688h-15.4688-1.125v-2.25h1.125 15.4688l-5.25-5.25-.7969-.79687 1.5937-1.59375.7969.796875 7.1719 7.171875.7968.79687z" />
            </svg>
          </a>
        </div>

        <div className="hero-actions">
          {actionCards.map((card, index) => (
            <div key={index} className="border-container">
              <a href={card.href} className="action-card">
                <div className="action-icon">{card.icon}</div>
                <div className="action-content">
                  <h3>{card.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="community-cards">
        {communityCards.map((card, index) => (
          <div key={index} className="community-card">
            <div className="community-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageHero;
