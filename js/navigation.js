/* ============================================
   Lumixsa AI - Navigation JavaScript
   ============================================ */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    // Sticky Navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu when clicking a link
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scroll to section
    function smoothScroll(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        }
    }

    // Active link highlighting
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initialize
    function init() {
        // Scroll event listener
        window.addEventListener('scroll', () => {
            handleScroll();
            highlightActiveLink();
        }, { passive: true });

        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Smooth scroll for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });

        // Close mobile menu on resize if open
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1023) {
                closeMobileMenu();
            }
        });

        // Initial check
        handleScroll();
        highlightActiveLink();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
