const servicesData = {
    spotify: {
        title: "Spotify",
        desc: "Escucha millones de canciones y podcasts. Descubre nueva música, crea tus propias playlists y disfruta de una experiencia de audio personalizada.",
        features: ["Música sin anuncios", "Modo offline", "Calidad de audio superior", "Playlists colaborativas"],
        color: "#1DB954",
        gradient: "linear-gradient(45deg, #1DB954, #191414)",
        templateId: "template_aq5wxar" // REEMPLAZAR
    },
    netflix: {
        title: "Netflix",
        desc: "Disfruta de películas, series y documentales premiados. Contenido original exclusivo que no encontrarás en ningún otro lugar.",
        features: ["Contenido 4K HDR", "Descargas para ver offline", "Perfiles para niños", "Juegos móviles incluidos"],
        color: "#E50914",
        gradient: "linear-gradient(45deg, #E50914, #000000)",
        templateId: "TEMPLATE_ID_NETFLIX" // REEMPLAZAR
    },
    crunchyroll: {
        title: "Crunchyroll",
        desc: "La biblioteca de anime más grande del mundo. Disfruta de los últimos episodios apenas una hora después de su emisión en Japón.",
        features: ["Simulcast con Japón", "Sin anuncios", "Manga digital", "Tienda exclusiva"],
        color: "#F47521",
        gradient: "linear-gradient(45deg, #F47521, #000000)",
        templateId: "TEMPLATE_ID_CRUNCHYROLL" // REEMPLAZAR
    },
    chatgpt: {
        title: "ChatGPT",
        desc: "Tu compañero de IA para la creatividad y la productividad. Obtén respuestas instantáneas, ideas creativas y ayuda profesional.",
        features: ["Modelo GPT-4o", "Generación de imágenes (DALL-E)", "Análisis de datos", "Navegación web"],
        color: "#10A37F",
        gradient: "linear-gradient(45deg, #10A37F, #000000)",
        templateId: "TEMPLATE_ID_CHATGPT" // REEMPLAZAR
    },
    gemini: {
        title: "Google Gemini",
        desc: "La IA más capaz de Google. Razonamiento multimodal avanzado para ayudarte a escribir, planificar, aprender y más.",
        features: ["Integración con Google Workspace", "Ventana de contexto de 1M+", "Razonamiento avanzado", "Multimodal nativo"],
        color: "#4E86F6",
        gradient: "linear-gradient(45deg, #4E86F6, #8E44AD)",
        templateId: "TEMPLATE_ID_GEMINI" // REEMPLAZAR
    },
    vix: {
        title: "Vix Premium",
        desc: "El servicio de streaming en español más grande del mundo. Series originales, novelas, películas y deportes en vivo.",
        features: ["Liga MX en vivo", "Originales de Vix", "Sin anuncios", "Estrenos de cine"],
        color: "#FF4B00",
        gradient: "linear-gradient(45deg, #FF4B00, #000000)",
        templateId: "TEMPLATE_ID_VIX" // REEMPLAZAR
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Preview Elements
    const previewSection = document.querySelector('.preview-content');
    const emptyState = document.querySelector('.empty-state');
    const pTitle = document.getElementById('preview-title');
    const pDesc = document.getElementById('preview-desc');
    const pFeatures = document.getElementById('preview-features');
    const pScreen = document.getElementById('preview-screen');
    const pAction = document.getElementById('preview-action');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Card Click Logic
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const data = servicesData[serviceKey];

            if (!data) return;

            // Update Content
            pTitle.textContent = data.title;
            pDesc.textContent = data.desc;

            // Update Features
            pFeatures.innerHTML = '';
            data.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-check"></i> ${feature}`;
                pFeatures.appendChild(li);
            });

            // Update Styles
            previewSection.style.setProperty('--preview-color', data.color);
            pScreen.style.setProperty('--preview-gradient', data.gradient);
            pScreen.innerHTML = `<div style="font-size: 2rem;">${data.title}</div>`; // Simple visual update

            // Show Preview
            emptyState.style.display = 'none';
            previewSection.classList.remove('hidden');
            // Force reflow
            void previewSection.offsetWidth;
            previewSection.classList.add('active');

            // Scroll to preview on mobile/small screens
            if (window.innerWidth < 768) {
                document.getElementById('preview').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // Checkout Logic
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.querySelector('.close-checkout');
    const checkoutOverlay = document.querySelector('.checkout-overlay');
    const pricingBtns = document.querySelectorAll('.pricing-btn');

    // Checkout Elements
    const cName = document.getElementById('checkout-product-name');
    const cPrice = document.getElementById('checkout-unit-price');
    const cTotal = document.getElementById('checkout-total');
    const cIcon = document.getElementById('checkout-icon');
    const qtyInput = document.getElementById('quantity');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const confirmBtn = document.querySelector('.confirm-purchase-btn');

    let currentUnitPrice = 0;
    let currentServiceKey = ''; // To track which service is being purchased

    function openCheckout(card) {
        // Extract Data
        const name = card.querySelector('.pricing-header h3').textContent;
        const price = parseFloat(card.querySelector('.amount').textContent);
        const iconClass = card.querySelector('.pricing-header i').className;
        const color = card.style.getPropertyValue('--brand-color');

        // Find service key based on name (simple mapping for this demo)
        // In a real app, you'd probably have the key on the pricing card data attribute
        const serviceNameLower = name.toLowerCase();
        if (serviceNameLower.includes('spotify')) currentServiceKey = 'spotify';
        else if (serviceNameLower.includes('netflix')) currentServiceKey = 'netflix';
        else if (serviceNameLower.includes('crunchyroll')) currentServiceKey = 'crunchyroll';
        else if (serviceNameLower.includes('chatgpt')) currentServiceKey = 'chatgpt';
        else if (serviceNameLower.includes('gemini')) currentServiceKey = 'gemini';
        else if (serviceNameLower.includes('vix')) currentServiceKey = 'vix';

        // Set Data
        cName.textContent = name + " Premium"; // Adding "Premium" for flair
        currentUnitPrice = price;
        cPrice.textContent = price;
        cIcon.innerHTML = `<i class="${iconClass}"></i>`;
        cIcon.style.color = color;

        // Reset State
        qtyInput.value = 1;
        updateTotal();

        // Show Modal
        checkoutModal.classList.remove('hidden');
        // Force reflow
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

    closeCheckoutBtn.addEventListener('click', closeCheckout);
    checkoutOverlay.addEventListener('click', closeCheckout);

    qtyMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) {
            qtyInput.value = val - 1;
            updateTotal();
        }
    });

    qtyPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
        updateTotal();
    });

    qtyInput.addEventListener('input', () => {
        let val = parseInt(qtyInput.value);
        if (val < 1) qtyInput.value = 1;
        updateTotal();
    });

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

        // Prepare template parameters
        const templateParams = {
            to_email: email,
            service_name: service,
            quantity: qty,
            total_amount: total,
            payment_method: method.toUpperCase(),
            order_id: Math.floor(Math.random() * 100000)
        };

        // Send email using EmailJS
        // INSTRUCCIÓN: Reemplaza 'TU_SERVICE_ID' con tu ID real
        const serviceID = 'service_78rvkky';

        // Get specific template ID for the selected service
        const templateID = servicesData[currentServiceKey]?.templateId || 'TEMPLATE_ID_DEFAULT';

        // Check if the user hasn't updated the template ID for this specific service
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
});



