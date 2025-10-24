// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Buy ticket functionality
function buyTicket(matchId) {
    const matches = {
        'barracas-boca': {
            teams: 'Barracas Central vs Boca Juniors',
            date: '27 Oct 2025',
            time: '16:00',
            venue: 'Estadio Claudio Fabián Tapia',
            price: '$8.000 - $30.000'
        },
        'estudiantes-boca': {
            teams: 'Estudiantes vs Boca Juniors',
            date: '2 Nov 2025',
            time: 'Por confirmar',
            venue: 'Estadio Jorge Luis Hirschi',
            price: '$10.000 - $35.000'
        },
        'boca-river': {
            teams: 'Boca Juniors vs River Plate',
            date: '9 Nov 2025',
            time: 'Por confirmar',
            venue: 'Estadio Alberto J. Armando (La Bombonera)',
            price: '$25.000 - $150.000'
        }
    };

    const match = matches[matchId];
    if (match) {
        showTicketConfirmation(match);
    }
}

// Show ticket confirmation modal
function showTicketConfirmation(match) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    const modal = document.createElement('div');
    modal.className = 'ticket-modal';
    modal.style.cssText = `
        background: linear-gradient(135deg, #003f7f 0%, #002856 100%);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;

    modal.innerHTML = `
        <div style="text-align: center; color: white;">
            <h2 style="color: #FFD700; margin-bottom: 1rem; font-size: 1.5rem;">🎫 COMPRA DE ENTRADAS</h2>
            <div style="border-top: 2px solid #FFD700; border-bottom: 2px solid #FFD700; padding: 1.5rem; margin: 1rem 0; background: rgba(255,255,255,0.1);">
                <p style="margin-bottom: 0.8rem;"><strong style="color: #FFD700;">Partido:</strong> ${match.teams}</p>
                <p style="margin-bottom: 0.8rem;"><strong style="color: #FFD700;">📅 Fecha:</strong> ${match.date}</p>
                <p style="margin-bottom: 0.8rem;"><strong style="color: #FFD700;">🕐 Hora:</strong> ${match.time}</p>
                <p style="margin-bottom: 0.8rem;"><strong style="color: #FFD700;">🏟️ Estadio:</strong> ${match.venue}</p>
                <p style="margin-bottom: 0;"><strong style="color: #FFD700;">💰 Precio:</strong> ${match.price}</p>
            </div>
            <p style="margin-top: 1.5rem; font-size: 1.1rem;">¿Deseas proceder con la compra?</p>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button onclick="closeModal()" style="flex: 1; padding: 12px; border: 2px solid #FFD700; background: transparent; color: #FFD700; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1rem;">
                    Cancelar
                </button>
                <button onclick="proceedToTicketForm(${JSON.stringify(match).replace(/"/g, '&quot;')})" style="flex: 1; padding: 12px; border: none; background: #FFD700; color: #003f7f; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1rem;">
                    Aceptar
                </button>
            </div>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close modal when clicking overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// Proceed to ticket form
function proceedToTicketForm(match) {
    closeModal();
    showTicketForm(match);
}

// Show ticket purchase form
function showTicketForm(match) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;

    const modal = document.createElement('div');
    modal.className = 'ticket-modal';
    modal.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    `;

    modal.innerHTML = `
        <div style="text-align: center; margin-bottom: 1.5rem;">
            <h2 style="color: #003f7f; margin-bottom: 0.5rem;">Comprar Entradas</h2>
            <p style="color: #666;">${match.teams}</p>
        </div>
        
        <form id="ticketForm" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Nombre completo" required style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px;">
            <input type="email" placeholder="Email" required style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px;">
            <input type="tel" placeholder="Teléfono" required style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px;">
            
            <select required style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px;">
                <option value="">Seleccionar categoría</option>
                <option value="platea">Platea - $150.000</option>
                <option value="popular">Popular - $50.000</option>
                <option value="general">General - $25.000</option>
            </select>
            
            <input type="number" placeholder="Número de entradas" min="1" max="6" value="1" required style="padding: 12px; border: 2px solid #e9ecef; border-radius: 8px;">
            
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="button" onclick="closeModal()" style="flex: 1; padding: 12px; border: 2px solid #ccc; background: white; color: #666; border-radius: 8px; cursor: pointer;">
                    Cancelar
                </button>
                <button type="submit" style="flex: 1; padding: 12px; border: none; background: linear-gradient(135deg, #003f7f 0%, #002856 100%); color: #FFD700; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    Comprar
                </button>
            </div>
        </form>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Handle form submission
    document.getElementById('ticketForm').addEventListener('submit', (e) => {
        e.preventDefault();
        processTicketPurchase();
    });

    // Close modal when clicking overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Process ticket purchase
function processTicketPurchase() {
    // Simulate processing
    const submitBtn = document.querySelector('#ticketForm button[type="submit"]');
    submitBtn.textContent = 'Procesando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        closeModal();
        showSuccessMessage();
    }, 2000);
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: bold;
    `;
    message.textContent = '✅ ¡Entradas compradas exitosamente! Revisa tu email.';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showContactSuccess();
    }, 2000);
}

// Show contact success message
function showContactSuccess() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: bold;
    `;
    message.textContent = '📧 ¡Mensaje enviado! Te contactaremos pronto.';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Social media links
function openSocial(platform) {
    const urls = {
        twitter: 'https://twitter.com/BocaJrsOficial',
        facebook: 'https://facebook.com/BocaJuniors',
        instagram: 'https://instagram.com/bocajrsoficial'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 63, 127, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #003f7f 0%, #002856 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animate statistics on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Animate number counting
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
        }
    }, 30);
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats when they come into view
    animateStats();
    
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.match-card, .news-card, .stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add some interactive features for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to team logos
    const teamImages = document.querySelectorAll('.team img');
    teamImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add pulse effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.boxShadow = '0 0 0 0 rgba(255, 107, 107, 0.7)';
            ctaButton.style.animation = 'pulse 2s infinite';
        }, 5000);
    }
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
        }
        
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
        }
        
        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
        }
    }
`;
document.head.appendChild(style);
