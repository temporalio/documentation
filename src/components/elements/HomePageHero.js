import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../../css/homepage-hero.css";

const Icon = ({ src, alt, className, width, height }) => {
    const darkSrc = src;
    const lightSrc = src.replace(".svg", "-dark.svg");

    return (
        <>
            <img
                src={useBaseUrl(darkSrc)}
                alt={alt}
                className={`icon-dark-mode ${className || ""}`}
                width={width}
                height={height}
            />
            <img
                src={useBaseUrl(lightSrc)}
                alt={alt}
                className={`icon-light-mode ${className || ""}`}
                width={width}
                height={height}
            />
        </>
    );
};

const HomePageHero = () => {
    const actionCards = [
        {
            href: "/develop",
            icon: <Icon src="/img/icons/Code.svg" alt="Code icon" />,
            title: "Developer Guide",
            description: "Dive into everything you need to know about building Temporal applications."
        },
        {
            href: "/production-deployment",
            icon: <Icon src="/img/icons/Rocket.svg" alt="Rocket icon" />,
            title: "Deploy your Workflows",
            description: "Deploy your Temporal Application to your environment."
        },
        {
            href: "https://learn.temporal.io/courses/",
            icon: <Icon src="/img/icons/Education.svg" alt="Education icon" />,
            title: "Take a free Temporal 101 or 102 course",
            description: "Learn the fundamentals with comprehensive courses and become a Temporal expert."
        },
        {
            href: "https://temporal.io/cloud",
            icon: <Icon src="/img/icons/Cloud.svg" alt="Cloud icon" />,
            title: "Get started for free with $1000 in credits",
            description: "Sign up for Temporal Cloud and let us host the Temporal Service for you."
        }
    ];

    const communityCards = [
        {
            href: "https://temporal.io/slack",
            icon: <Icon src="/img/icons/Slack.svg" alt="Slack" width="20" height="20" />,
            title: "Slack Community",
            description: "Join us on temporal.io/slack and chat with us directly."
        },
        {
            href: "https://community.temporal.io",
            icon: <Icon src="/img/icons/Book.svg" alt="Book" width="20" height="20" />,
            title: "Developer Forum",
            description: "Ask questions, search solutions, and learn from other developers."
        },
        {
            href: "#",
            icon: <Icon src="/img/icons/Message.svg" alt="Message" width="22" height="22" />,
            title: "Ask AI",
            description: "Try our Ask AI button next to the search bar for instant answers and personalized help."
        }
    ];

    return (
        <div className="homepage-hero-wrapper">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Build applications that never fail</h1>
                    <p>
                        Temporal is an open-source platform for building reliable applications.
                        Temporal delivers crash-proof execution by guaranteeing that applications resume exactly where they left off after crashes, network failures, or infrastructure outages, whether that happens seconds, days, or even years later.
                    </p>
                    <p>
                        Temporal enables developers to focus on building features that drive the business while ensuring that mission-critical processes such as order fulfillment, customer onboarding, and payment processing never fail or disappear, regardless of what goes wrong.
                    </p>
                    <a href="/quickstarts" className="hero-cta">
                        Quickstart →
                    </a>
                </div>
                <div className="hero-actions">
                    {actionCards.map((card, index) => (
                        <a key={index} href={card.href} className="action-card">
                            <div className="action-icon">
                                {card.icon}
                            </div>
                            <div className="action-content">
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="community-cards">
                {communityCards.map((card, index) => (
                    <a key={index} href={card.href} className="community-card">
                        <div className="community-icon">
                            {card.icon}
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HomePageHero;

