import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Original Brand SVGs
const GitHubIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const InstagramIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const FacebookIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const XIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const DOCK_ITEMS = [
    { name: 'GitHub', icon: GitHubIcon, color: '#333', link: 'https://github.com/' },
    { name: 'LinkedIn', icon: LinkedInIcon, color: '#0077b5', link: 'https://linkedin.com/' },
    { name: 'Instagram', icon: InstagramIcon, color: '#E1306C', link: 'https://instagram.com/' },
    { name: 'Facebook', icon: FacebookIcon, color: '#1877f2', link: 'https://facebook.com/' },
    { name: 'X', icon: XIcon, color: '#000000', link: 'https://x.com/' },
];

const BOTTOM_MARGIN = 20;

const Dock = () => {
    const dockRef = useRef(null);
    const wrapRef = useRef(null);
    const rafRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    /* ── Scroll-aware bottom positioning ── */
    const updatePosition = useCallback(() => {
        const wrap = wrapRef.current;
        const footer = document.querySelector('footer');
        if (!wrap || !footer) return;

        const footerTop = footer.getBoundingClientRect().top;
        const viewportH = window.innerHeight;
        const dockBottom = BOTTOM_MARGIN;

        const footerFromBottom = viewportH - footerTop;

        if (footerFromBottom > 0) {
            const newBottom = footerFromBottom + BOTTOM_MARGIN;
            wrap.style.bottom = `${newBottom}px`;
        } else {
            wrap.style.bottom = `${dockBottom}px`;
        }
    }, []);

    useEffect(() => {
        const loop = () => {
            updatePosition();
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
    }, [updatePosition]);

    /* ── GSAP fish-eye ── */
    useGSAP(() => {
        const items = gsap.utils.toArray('.dock-item');

        const onMouseMove = (e) => {
            const { clientX } = e;
            items.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const center = rect.left + rect.width / 2;
                const distance = Math.abs(clientX - center);
                const maxDist = 120;

                let scale = 1, y = 0;
                if (distance < maxDist) {
                    const factor = 1 - distance / maxDist;
                    scale = 1 + factor * 1.0;
                    y = factor * -36;
                }
                gsap.to(item, { scale, y, duration: 0.18, ease: 'power2.out' });
            });
        };

        const onMouseLeave = () => {
            gsap.to(items, { scale: 1, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.35)' });
            setHoveredIndex(null);
        };

        const el = dockRef.current;
        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);
        return () => {
            el.removeEventListener('mousemove', onMouseMove);
            el.removeEventListener('mouseleave', onMouseLeave);
        };
    }, { scope: dockRef });

    return (
        <div
            ref={wrapRef}
            className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2" // Increased gap slightly
            style={{ bottom: `${BOTTOM_MARGIN}px`, willChange: 'bottom' }}
        >
            {/* "Follow Me" label */}
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 select-none">
                Follow Me
            </span>

            {/* Dock bar */}
            <div
                ref={dockRef}
                className="flex items-end gap-3 px-5 py-3 
                           bg-white/25 dark:bg-black/30
                           backdrop-blur-2xl
                           border border-white/40 dark:border-white/10
                           rounded-[2.5rem]
                           shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
            >
                {DOCK_ITEMS.map((item, index) => (
                    <div
                        key={item.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredIndex(index)}
                    >
                        {/* Tooltip */}
                        <div
                            className={`
                                absolute -top-24 left-1/2 -translate-x-1/2 z-50
                                px-3 py-1.5 bg-gray-900 text-white shadow-xl
                                text-xs font-bold rounded-lg
                                whitespace-nowrap pointer-events-none
                                transition-all duration-200 ease-out
                                ${hoveredIndex === index
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-2 scale-90'}
                            `}
                        >
                            {item.name}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900" />
                        </div>

                        {/* Icon tile */}
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dock-item flex items-center justify-center
                                       w-10 h-10 
                                       bg-white/90 dark:bg-gray-800/90
                                       rounded-[1rem]
                                       shadow-md cursor-pointer
                                       hover:bg-white dark:hover:bg-gray-700
                                       transition-colors duration-150"
                        >
                            <item.icon
                                width="20" height="20"
                                style={{ color: hoveredIndex === index ? item.color : 'currentColor' }}
                                className="text-gray-600 dark:text-gray-400 transition-colors duration-150"
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dock;
