// Plants vs Zombies Website JavaScript

// Back to Top Button Functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll for back to top
document.getElementById('backToTop')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.\n\nNote: This is a demo form. In a production environment, this would send your message to our server.');
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active class to navigation links based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Fullscreen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const gameWrapper = document.querySelector('.game-wrapper');
    let isUsingFallback = false;
    
    if (fullscreenBtn && gameWrapper) {
        fullscreenBtn.addEventListener('click', function() {
            toggleFullscreen();
        });
        
        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    }
    
    function isFullscreenActive() {
        return !!(document.fullscreenElement || 
                 document.webkitFullscreenElement || 
                 document.mozFullScreenElement || 
                 document.msFullscreenElement ||
                 (isUsingFallback && gameWrapper.classList.contains('fullscreen')));
    }
    
    function handleFullscreenChange() {
        const isFullscreen = isFullscreenActive();
        updateFullscreenState(isFullscreen);
    }
    
    function updateFullscreenState(isFullscreen) {
        if (isFullscreen) {
            gameWrapper.classList.add('fullscreen');
            document.body.classList.add('fullscreen-mode');
            document.documentElement.classList.add('fullscreen-mode');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            fullscreenBtn.title = 'Exit Fullscreen (Press ESC)';
        } else {
            // Ensure all fullscreen classes and styles are removed
            gameWrapper.classList.remove('fullscreen');
            document.body.classList.remove('fullscreen-mode');
            document.documentElement.classList.remove('fullscreen-mode');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            fullscreenBtn.title = 'Enter Fullscreen';
            isUsingFallback = false;
            
            // Force a reflow to ensure styles are applied
            void gameWrapper.offsetHeight;
            
            // Scroll back to the game container if needed
            setTimeout(function() {
                gameWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    function toggleFullscreen() {
        const isFullscreen = isFullscreenActive();
        
        if (!isFullscreen) {
            // Enter fullscreen
            if (gameWrapper.requestFullscreen) {
                gameWrapper.requestFullscreen().catch(err => {
                    console.log('Fullscreen error:', err);
                    // Fallback to CSS fullscreen
                    isUsingFallback = true;
                    gameWrapper.classList.add('fullscreen');
                    document.body.style.overflow = 'hidden';
                    updateFullscreenState(true);
                });
            } else if (gameWrapper.webkitRequestFullscreen) {
                gameWrapper.webkitRequestFullscreen();
            } else if (gameWrapper.mozRequestFullScreen) {
                gameWrapper.mozRequestFullScreen();
            } else if (gameWrapper.msRequestFullscreen) {
                gameWrapper.msRequestFullscreen();
            } else {
                // Fallback: use CSS fullscreen class
                isUsingFallback = true;
                gameWrapper.classList.add('fullscreen');
                document.body.style.overflow = 'hidden';
                updateFullscreenState(true);
            }
        } else {
            // Exit fullscreen
            if (isUsingFallback) {
                // Exit fallback fullscreen
                isUsingFallback = false;
                updateFullscreenState(false);
            } else {
                // Exit native fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen().catch(err => {
                        console.log('Exit fullscreen error:', err);
                        updateFullscreenState(false);
                    });
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else {
                    updateFullscreenState(false);
                }
            }
        }
    }
    
    // Handle ESC key to exit fullscreen
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isFullscreenActive()) {
            toggleFullscreen();
        }
    });
});

// Lazy loading for images (if any are added in the future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

