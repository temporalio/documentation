import React, { useState } from 'react';
import styles from './LanguageSelector.module.css';

export const LanguageSelector = () => {
    const [hoveredLanguage, setHoveredLanguage] = useState(null);

    const languages = [
        {
            name: 'Python',
            icon: '/img/sdks/sdk-box-logos/python.svg',
            href: '/build-your-first-basic-workflow/python'
        },
        {
            name: 'Go',
            icon: '/img/sdks/sdk-box-logos/go.svg',
            href: 'https://learn.temporal.io/getting_started/go/first_program_in_go/'
        },
        {
            name: 'Java',
            icon: '/img/sdks/sdk-box-logos/java.svg',
            href: 'https://learn.temporal.io/getting_started/java/first_program_in_java/'
        },
        {
            name: 'TypeScript',
            icon: '/img/sdks/sdk-box-logos/typescript.svg',
            href: 'https://learn.temporal.io/getting_started/typescript/first_program_in_typescript/'
        },
        {
            name: '.NET',
            icon: '/img/sdks/sdk-box-logos/dotnet.svg',
            href: 'https://learn.temporal.io/getting_started/dotnet/first_program_in_dotnet/'
        },
        {
            name: 'PHP',
            icon: '/img/sdks/sdk-box-logos/php.svg',
            href: 'https://learn.temporal.io/getting_started/php/first_program_in_php/'
        },
        {
            name: 'Ruby',
            icon: '/img/sdks/sdk-box-logos/ruby.svg',
            href: 'https://learn.temporal.io/getting_started/ruby/first_program_in_ruby/'
        }
    ];

    return (
        <div className={styles.languageSelector}>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>
                    Develop in
                </h2>
                <h2 className={styles.language}>
                    {hoveredLanguage || 'your language'}
                </h2>
            </div>

            <div className={styles.iconsContainer}>
                {languages.map((lang) => (
                    <a
                        key={lang.name}
                        href={lang.href}
                        className={`${styles.languageIcon} ${hoveredLanguage === lang.name ? styles.active : ''}`}
                        onMouseEnter={() => setHoveredLanguage(lang.name)}
                        onMouseLeave={() => setHoveredLanguage(null)}
                        title={`Run Your First Basic Workflow in ${lang.name}`}
                    >
                        <img
                            src={lang.icon}
                            alt={`${lang.name} SDK`}
                            className={styles.icon}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
};
