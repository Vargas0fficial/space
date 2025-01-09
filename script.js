// Mobile navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navList = document.querySelector('nav ul');

mobileNavToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileNavToggle.innerHTML = navList.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.mobile-nav-toggle')) {
        navList.classList.remove('active');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile nav when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navigation click animations
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add clicked class for ripple effect
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 600);
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Remove active class from all links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'nav-ripple';
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
        
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Close mobile menu if open
        const navList = document.querySelector('nav ul');
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for stars (disable on mobile for performance)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const stars = document.querySelector('.stars');
        const scrolled = window.pageYOffset;
        stars.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Interactive portfolio items with touch support
document.querySelectorAll('.portfolio-item').forEach(item => {
    const handleEnter = () => {
        item.style.transform = 'scale(1.05) translateY(-10px)';
    };
    
    const handleLeave = () => {
        item.style.transform = 'scale(1) translateY(0)';
    };
    
    item.addEventListener('mouseenter', handleEnter);
    item.addEventListener('mouseleave', handleLeave);
    item.addEventListener('touchstart', handleEnter);
    item.addEventListener('touchend', handleLeave);
});

// Add scroll behavior for navbar
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        header.classList.add('nav-scrolled');
    } else {
        header.classList.remove('nav-scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('nav-hidden');
    } else {
        header.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Add click effects
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'nav-ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Create spark effects
        for (let i = 0; i < 3; i++) {
            const spark = document.createElement('div');
            spark.className = 'nav-spark';
            spark.style.width = spark.style.height = `${2 + Math.random() * 3}px`;
            spark.style.left = `${e.clientX - rect.left}px`;
            spark.style.top = `${e.clientY - rect.top}px`;
            spark.style.transform = `rotate(${Math.random() * 360}deg)`;
            this.appendChild(spark);
            
            setTimeout(() => spark.remove(), 500);
        }
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate, .stagger-animate').forEach(element => {
    scrollObserver.observe(element);
});

// Parallax scroll effect
const parallaxElements = document.querySelectorAll('.parallax-bg');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(element => {
        const parent = element.closest('.parallax');
        const speed = element.dataset.speed || 0.5;
        const offset = parent.offsetTop;
        const limit = parent.offsetHeight + offset;
        
        if (scrolled >= offset && scrolled <= limit) {
            element.style.transform = `translateY(${(scrolled - offset) * speed}px)`;
        }
    });
});

// Floating elements on scroll
const floatingElements = document.querySelectorAll('.float-scroll');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
    
    floatingElements.forEach(element => {
        const speed = element.dataset.floatSpeed || 0.3;
        const maxFloat = element.dataset.floatMax || 30;
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top >= 0 && rect.bottom <= viewportHeight) {
            const scrollPercent = (rect.top + rect.height / 2) / viewportHeight;
            const floatY = Math.sin(scrollPercent * Math.PI) * maxFloat * scrollDirection * speed;
            element.style.transform = `translateY(${floatY}px)`;
        }
    });
    
    lastScrollTop = scrollTop;
});

// Scroll indicator interaction
const scrollIndicator = document.querySelector('.scroll-indicator');

scrollIndicator.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    // Position ripple at click point
    const rect = scrollIndicator.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    
    scrollIndicator.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
    
    // Smooth scroll to next section
    const nextSection = document.querySelector('#about');
    nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Add click animation
    const arrow = scrollIndicator.querySelector('i');
    arrow.style.transform = 'translateY(10px)';
    arrow.style.opacity = '0.5';
    
    setTimeout(() => {
        arrow.style.transform = '';
        arrow.style.opacity = '';
    }, 300);
});

// Pulse effect on page load
setTimeout(() => {
    const arrow = scrollIndicator.querySelector('i');
    arrow.style.animation = 'floatArrow 2s ease-in-out infinite';
}, 1000);

// Hide scroll indicator when reaching bottom
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    
    if (scrolled + windowHeight >= fullHeight - 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// Create dynamic starry background
function createStarryBackground() {
    const background = document.createElement('div');
    background.className = 'cosmic-background';
    document.body.appendChild(background);

    // Add different types of stars
    for (let i = 0; i < 100; i++) {
        createStar('star-small', background);
    }
    for (let i = 0; i < 50; i++) {
        createStar('star-medium', background);
    }
    for (let i = 0; i < 25; i++) {
        createStar('star-large', background);
    }

    // Add shooting stars
    for (let i = 0; i < 5; i++) {
        createShootingStar(background);
    }

    // Add star clusters
    for (let i = 0; i < 3; i++) {
        createStarCluster(background);
    }

    // Add nebula effects
    for (let i = 0; i < 3; i++) {
        createNebula(background);
    }
}

function createStar(className, parent) {
    const star = document.createElement('div');
    star.className = `star ${className}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    parent.appendChild(star);
}

function createShootingStar(parent) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 10}s`;
    parent.appendChild(star);

    // Remove and recreate shooting star after animation
    star.addEventListener('animationend', () => {
        star.remove();
        createShootingStar(parent);
    });
}

function createStarCluster(parent) {
    const cluster = document.createElement('div');
    cluster.className = 'star-cluster';
    cluster.style.left = `${Math.random() * 100}%`;
    cluster.style.top = `${Math.random() * 100}%`;

    // Add stars to cluster
    for (let i = 0; i < 10; i++) {
        const star = document.createElement('div');
        star.className = 'star star-small';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        cluster.appendChild(star);
    }

    parent.appendChild(cluster);
}

function createNebula(parent) {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.style.left = `${Math.random() * 100}%`;
    nebula.style.top = `${Math.random() * 100}%`;
    nebula.style.animationDelay = `${Math.random() * 8}s`;
    parent.appendChild(nebula);
}

// Initialize starry background
document.addEventListener('DOMContentLoaded', createStarryBackground);

// Recreate shooting stars periodically
setInterval(() => {
    const background = document.querySelector('.cosmic-background');
    if (background && document.querySelectorAll('.shooting-star').length < 5) {
        createShootingStar(background);
    }
}, 3000);
