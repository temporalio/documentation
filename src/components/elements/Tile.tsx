import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './Tile.module.css';


export type TileProps = {
title: string;
description: string;
tags?: string[]; // collected, may be used later
href?: string; // clickable card when present
icon?: React.ReactNode; // emoji or SVG
className?: string;
};


export default function Tile({ title, description, tags = [], href, icon, className }: TileProps) {
const Container: React.ElementType = href ? Link : 'div';
const containerProps = href ? { to: href } : {};


return (
<Container
{...containerProps}
className={clsx('card', styles.tile, className)}
aria-label={href ? title : undefined}
>
<div className={clsx('card__header', styles.header)}>
{icon ? <div className={styles.icon} aria-hidden>{icon}</div> : null}
<h3 className={styles.title}>{title}</h3>
</div>
<div className={clsx('card__body', styles.body)}>
<p className={styles.description}>{description}</p>
{tags.length > 0 && (
<ul className={styles.tags} aria-label="labels">
{tags.map((t) => (
<li key={t} className={clsx('badge badge--secondary', styles.tag)}>{t}</li>
))}
</ul>
)}
</div>
{href && (
<div className={clsx('card__footer', styles.footer)}>
<span className={styles.cta}>
Learn more
<svg
className={styles.arrow}
width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
>
<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</span>
</div>
)}
</Container>
);
}