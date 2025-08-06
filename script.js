// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide scroll indicator when user starts scrolling
    if (scrolled > 50) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }

    // Update active navigation link
    updateActiveNavLink();
});

// Function to update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });

    // If at the top, make Home active
    if (scrollPosition < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Initialize active nav link on page load
updateActiveNavLink();

// View More Projects Functionality
const viewMoreBtn = document.getElementById('viewMoreBtn');
const hiddenProjects = document.querySelectorAll('.hidden-project');
let projectsShown = false;

viewMoreBtn.addEventListener('click', () => {
    if (!projectsShown) {
        // Show hidden projects
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('show');
            }, index * 200); // Stagger animation
        });

        // Update button text
        viewMoreBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Show Less';
        projectsShown = true;
    } else {
        // Hide projects
        hiddenProjects.forEach(project => {
            project.classList.remove('show');
        });

        // Update button text
        viewMoreBtn.innerHTML = '<i class="fas fa-eye"></i> View More Projects';
        projectsShown = false;
    }
});

// Scroll Animation Functions
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('has-animated')) {
                // Mark as animated to prevent re-animation
                entry.target.classList.add('has-animated');

                // Add animation class with a slight delay for better visual impact
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 100);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animations
    const animatedElements = document.querySelectorAll('.scroll-animate, .stagger-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();

    // Ensure floating widget is visible immediately
    const floatingWidget = document.getElementById('floatingWidget');
    if (floatingWidget) {
        floatingWidget.style.opacity = '1';
        floatingWidget.style.transform = 'translateY(0) scale(1)';
    }
});

// Additional fallback for floating widget visibility
window.addEventListener('load', () => {
    const floatingWidget = document.getElementById('floatingWidget');
    if (floatingWidget) {
        floatingWidget.style.opacity = '1';
        floatingWidget.style.transform = 'translateY(0) scale(1)';
        floatingWidget.style.display = 'block';
        floatingWidget.style.visibility = 'visible';
    }
});

// Final fallback - ensure floating widget is visible after everything loads
setTimeout(() => {
    const floatingWidget = document.getElementById('floatingWidget');
    if (floatingWidget) {
        floatingWidget.style.opacity = '1';
        floatingWidget.style.transform = 'translateY(0) scale(1)';
        floatingWidget.style.display = 'block';
        floatingWidget.style.visibility = 'visible';
    }
}, 2000); 