const servicesData = {
    spotify: {
        title: "Spotify",
        desc: "100+ millones de canciones, podcasts exclusivos y 15 horas de audiolibros incluidos cada mes. Audio en calidad 320kbps.",
        features: ["Sin anuncios", "Descargas offline", "15h audiolibros/mes", "Spotify Connect"],
        color: "#1DB954",
        gradient: "linear-gradient(45deg, #1DB954, #191414)",
        templateId: "template_aq5wxar"
    },
    netflix: {
        title: "Netflix",
        desc: "4K Ultra HD + HDR + Dolby Vision + Spatial Audio. La mejor experiencia cinematográfica desde tu hogar.",
        features: ["4K UHD + Dolby Vision", "Spatial Audio", "4 pantallas simultáneas", "Juegos móviles"],
        color: "#E50914",
        gradient: "linear-gradient(45deg, #E50914, #000000)",
        templateId: "TEMPLATE_ID_NETFLIX"
    },
    crunchyroll: {
        title: "Crunchyroll",
        desc: "+45,000 episodios y +1,400 series. Simulcast 1 hora después de Japón. El catálogo de anime más grande.",
        features: ["Simulcast Japón", "4 dispositivos", "Game Vault", "10% descuento tienda"],
        color: "#F47521",
        gradient: "linear-gradient(45deg, #F47521, #000000)",
        templateId: "TEMPLATE_ID_CRUNCHYROLL"
    },
    chatgpt: {
        title: "ChatGPT",
        desc: "GPT-4o con acceso ilimitado, DALL-E 3 para imágenes, análisis de datos avanzado y navegación web.",
        features: ["GPT-4o ilimitado", "DALL-E 3 + Visión", "GPTs personalizados", "Análisis de archivos"],
        color: "#10A37F",
        gradient: "linear-gradient(45deg, #10A37F, #000000)",
        templateId: "TEMPLATE_ID_CHATGPT"
    },
    gemini: {
        title: "Google Gemini",
        desc: "Gemini 1.5 Pro con contexto de 1M tokens. Analiza documentos enormes, crea Gems y usa Gemini Live.",
        features: ["Gemini 1.5 Pro", "2TB Google One", "Gems + Gemini Live", "Integración Workspace"],
        color: "#4E86F6",
        gradient: "linear-gradient(45deg, #4E86F6, #8E44AD)",
        templateId: "TEMPLATE_ID_GEMINI"
    },
    vix: {
        title: "Vix Premium",
        desc: "UEFA Champions League, Liga MX, novelas originales y +100 canales en vivo. El streaming latino más completo.",
        features: ["UEFA Champions League", "Liga MX en vivo", "+100 canales", "Originales exclusivos"],
        color: "#FF4B00",
        gradient: "linear-gradient(45deg, #FF4B00, #000000)",
        templateId: "TEMPLATE_ID_VIX"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // HAMBURGER MENU LOGIC
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        // Toggle menu function
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Hamburger click
        hamburger.addEventListener('click', toggleMenu);

        // Overlay click to close
        overlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on window resize (if becomes desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // PRODUCT CARDS MOBILE TAP LOGIC
    // ========================================
    const productCards = document.querySelectorAll('.product-card');

    if (productCards.length > 0) {
        // Check if it's a touch device
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (isTouchDevice) {
            productCards.forEach(card => {
                card.addEventListener('click', function (e) {
                    // If card is already active, let the link work
                    if (this.classList.contains('touch-active')) {
                        return;
                    }

                    // Prevent default behavior
                    e.preventDefault();

                    // Remove active class from all other cards
                    productCards.forEach(c => {
                        if (c !== this) {
                            c.classList.remove('touch-active');
                        }
                    });

                    // Toggle active class on this card
                    this.classList.toggle('touch-active');
                });
            });

            // Close popup when clicking outside
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.product-card')) {
                    productCards.forEach(card => {
                        card.classList.remove('touch-active');
                    });
                }
            });
        }
    }

    // Filter Logic (only on index.html)
    const cards = document.querySelectorAll('.product-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length > 0 && cards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // Checkout Logic (on planes.html)
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.querySelector('.close-checkout');
    const checkoutOverlay = document.querySelector('.checkout-overlay');
    const pricingBtns = document.querySelectorAll('.pricing-btn');

    // Only run checkout logic if modal exists
    if (!checkoutModal) return;

    const cName = document.getElementById('checkout-product-name');
    const cPrice = document.getElementById('checkout-unit-price');
    const cTotal = document.getElementById('checkout-total');
    const cIcon = document.getElementById('checkout-icon');
    const qtyInput = document.getElementById('quantity');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const confirmBtn = document.querySelector('.confirm-purchase-btn');

    let currentUnitPrice = 0;
    let currentServiceKey = '';

    function openCheckout(card) {
        const name = card.querySelector('.pricing-header h3').textContent;
        const price = parseFloat(card.querySelector('.amount').textContent);
        const iconElement = card.querySelector('.pricing-icon-neon i') || card.querySelector('.pricing-header i');
        const iconClass = iconElement ? iconElement.className : 'fa-solid fa-box';
        const color = card.style.getPropertyValue('--brand-color');

        const serviceNameLower = name.toLowerCase();
        if (serviceNameLower.includes('spotify')) currentServiceKey = 'spotify';
        else if (serviceNameLower.includes('netflix')) currentServiceKey = 'netflix';
        else if (serviceNameLower.includes('crunchyroll')) currentServiceKey = 'crunchyroll';
        else if (serviceNameLower.includes('chatgpt')) currentServiceKey = 'chatgpt';
        else if (serviceNameLower.includes('gemini')) currentServiceKey = 'gemini';
        else if (serviceNameLower.includes('vix')) currentServiceKey = 'vix';

        cName.textContent = name + " Premium";
        currentUnitPrice = price;
        cPrice.textContent = price;
        cIcon.innerHTML = `<i class="${iconClass}"></i>`;
        cIcon.style.color = color;

        qtyInput.value = 1;
        updateTotal();

        checkoutModal.classList.remove('hidden');
        void checkoutModal.offsetWidth;
        checkoutModal.classList.add('active');
    }

    function closeCheckout() {
        checkoutModal.classList.remove('active');
        setTimeout(() => {
            checkoutModal.classList.add('hidden');
        }, 300);
    }

    function updateTotal() {
        const qty = parseInt(qtyInput.value) || 1;
        const total = (currentUnitPrice * qty).toFixed(2);
        cTotal.textContent = total;
    }

    // Event Listeners
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.pricing-card');
            openCheckout(card);
        });
    });

    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) {
                qtyInput.value = val - 1;
                updateTotal();
            }
        });
    }

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
            updateTotal();
        });
    }

    if (qtyInput) {
        qtyInput.addEventListener('input', () => {
            let val = parseInt(qtyInput.value);
            if (val < 1) qtyInput.value = 1;
            updateTotal();
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const method = document.querySelector('input[name="payment"]:checked').value;
            const qty = qtyInput.value;
            const total = cTotal.textContent;
            const service = cName.textContent;
            const email = document.getElementById('user-email').value;

            if (!email || !email.includes('@')) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            confirmBtn.textContent = "Procesando...";
            confirmBtn.disabled = true;

            const templateParams = {
                to_email: email,
                service_name: service,
                quantity: qty,
                total_amount: total,
                payment_method: method.toUpperCase(),
                order_id: Math.floor(Math.random() * 100000)
            };

            const serviceID = 'service_78rvkky';
            const templateID = servicesData[currentServiceKey]?.templateId || 'TEMPLATE_ID_DEFAULT';

            if (templateID.includes('TEMPLATE_ID_')) {
                alert(`Error de Configuración:\n\nNo has configurado el Template ID para ${service}.\n\nPor favor, ve al archivo script.js y reemplaza "${templateID}" con el ID real de tu plantilla de EmailJS para este producto.`);
                confirmBtn.textContent = "Proceder al Pago";
                confirmBtn.disabled = false;
                return;
            }

            emailjs.send(serviceID, templateID, templateParams)
                .then(() => {
                    alert(`¡Gracias por tu compra!\n\nHemos enviado los detalles del pedido #${templateParams.order_id} a ${email}.\n\nRevisa tu bandeja de entrada (y spam por si acaso) para las instrucciones de pago.`);
                    closeCheckout();
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                    alert(`Hubo un error al enviar el correo:\n${JSON.stringify(error)}\n\nPor favor verifica tu Public Key, Service ID y Template ID.`);
                })
                .finally(() => {
                    confirmBtn.textContent = "Proceder al Pago";
                    confirmBtn.disabled = false;
                });
        });
    }
});

// ========================================
// WARNING POP-UP LOGIC
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const warningPopup = document.getElementById('warning-popup');
    const warningConfirm = document.getElementById('warning-confirm');
    const warningCloseBtn = document.getElementById('warning-close-btn');

    if (warningPopup && warningConfirm && warningCloseBtn) {
        // Check if user has already seen the warning
        const hasSeenWarning = localStorage.getItem('gshop_warning_seen');

        if (hasSeenWarning) {
            // User has already seen warning, hide it immediately
            warningPopup.classList.add('hidden');
        } else {
            // First time visitor, show warning and prevent scrolling
            document.body.style.overflow = 'hidden';

            // Handle checkbox change
            warningConfirm.addEventListener('change', function () {
                warningCloseBtn.disabled = !this.checked;
            });

            // Handle close button click
            warningCloseBtn.addEventListener('click', function () {
                if (!this.disabled) {
                    // Save to localStorage so it doesn't show again
                    localStorage.setItem('gshop_warning_seen', 'true');
                    warningPopup.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
    }
});
