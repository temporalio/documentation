import React, { useState, useEffect, useRef } from 'react';
import styles from './AnimatedTerminal.module.css';

export const AnimatedTerminal = ({
    lines = [],
    delay = 1000,
    typingSpeed = 50,
    prompt = "$",
    autoStart = true,
    startOnVisible = false,
    loop = false,
    restartDelay = 2000
}) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const [shouldStart, setShouldStart] = useState(!startOnVisible);
    const terminalRef = useRef(null);

    // Intersection Observer for scroll-triggered start
    useEffect(() => {
        if (!startOnVisible || shouldStart) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldStart(true);
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of the component is visible
                rootMargin: '0px 0px -100px 0px' // Start slightly before it's fully visible
            }
        );

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [startOnVisible, shouldStart]);

    useEffect(() => {
        if (!shouldStart || !autoStart || lines.length === 0) return;

        const showNextLine = () => {
            if (currentLineIndex < lines.length) {
                setIsTyping(true);

                // Simulate typing effect for current line
                const currentLine = lines[currentLineIndex];
                let charIndex = 0;
                const typingInterval = setInterval(() => {
                    if (charIndex <= currentLine.length) {
                        setDisplayedLines(prev => {
                            const newLines = [...prev];
                            newLines[currentLineIndex] = currentLine.slice(0, charIndex);
                            return newLines;
                        });
                        charIndex++;
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                        setCurrentLineIndex(prev => prev + 1);
                    }
                }, typingSpeed);

                return () => clearInterval(typingInterval);
            } else if (loop && currentLineIndex === lines.length) {
                // Animation complete, restart if looping
                setIsRestarting(true);
                const restartTimer = setTimeout(() => {
                    setDisplayedLines([]);
                    setCurrentLineIndex(0);
                    setIsRestarting(false);
                }, restartDelay);

                return () => clearTimeout(restartTimer);
            }
        };

        const timer = setTimeout(() => {
            showNextLine();
        }, currentLineIndex === 0 ? 0 : delay);

        return () => clearTimeout(timer);
    }, [currentLineIndex, lines, delay, typingSpeed, autoStart, loop, restartDelay, shouldStart]);

    const bodyHeight = lines.length * 24 + 32;

    return (
        <div ref={terminalRef} className={styles.terminal}>
            <div className={styles.terminalHeader}>
                <div className={styles.terminalButtons}>
                    <span className={styles.close}></span>
                    <span className={styles.minimize}></span>
                    <span className={styles.maximize}></span>
                </div>
                <div className={styles.terminalTitle}>Terminal</div>
            </div>
            <div className={styles.terminalBody} style={{ height: bodyHeight }}>
                {displayedLines.map((line, index) => (
                    <div key={`${currentLineIndex}-${index}`} className={styles.terminalLine}>
                        <span className={styles.prompt}>{prompt}</span>
                        <span className={styles.command}>{line}</span>
                        {index === currentLineIndex && isTyping && (
                            <span className={styles.cursor}>|</span>
                        )}
                    </div>
                ))}
                {(currentLineIndex < lines.length && !isTyping && !isRestarting) && (
                    <div className={styles.terminalLine}>
                        <span className={styles.prompt}>{prompt}</span>
                        <span className={styles.cursor}>|</span>
                    </div>
                )}
            </div>
        </div>
    );
};
