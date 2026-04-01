/* ================================================================
   MOOSAMART - MAIN JAVASCRIPT LOGIC
   (Future updates yahan add karte rahein)
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MODAL / LIGHTBOX LOGIC ---
    const modal = document.getElementById('imageModal');
    const logoArea = document.querySelector('.brand-wrapper');
    const closeBtn = document.querySelector('.close-modal');

    // Double Click to Open Modal
    if (logoArea) {
        logoArea.addEventListener('dblclick', () => {
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
                document.body.style.overflow = 'hidden'; // Background scroll stop
            }
        });
    }

    // Function to Close Modal
    const closeModal = () => {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 400);
            document.body.style.overflow = ''; // Background scroll start
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeModal();
    });


    // --- 2. FUTURE LOGIC: ADD TO CART (Example) ---
    // Jab aap niche buttons par click karenge, ye function update hoga
    const cartButtons = document.querySelectorAll('.btn-primary');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Yahan cart update ka logic aayega
            console.log("Item added to cart!");
        });
    });

});
/* ================================================================
   MOOSAMART - FINAL REPAIR SCRIPT (Slider + Dropdown)
================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log("MoosaMart Script Loaded!"); // Ye check karne ke liye ki JS chal rahi hai

    // --- FUNCTION 1: CATEGORY DROPDOWN ---
    const setupDropdown = () => {
        const btn = document.getElementById('catMenuBtn');
        const menu = document.getElementById('catDropdown');

        if (btn && menu) {
            btn.onclick = (e) => {
                e.stopPropagation();
                menu.classList.toggle('active');
                btn.classList.toggle('open');
                console.log("Dropdown Toggled");
            };

            document.onclick = (e) => {
                if (!btn.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('active');
                    btn.classList.remove('open');
                }
            };
        } else {
            console.error("Dropdown elements (catMenuBtn or catDropdown) not found!");
        }
    };

    // --- FUNCTION 2: POP & COVER SLIDER ---
    const setupSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const next = document.getElementById('nextSlide');
        const prev = document.getElementById('prevSlide');

        if (slides.length === 0) {
            console.warn("No slides found!");
            return;
        }

        let index = 0;
        let timer;

        const show = (i) => {
            slides.forEach(s => s.classList.remove('active-slide'));
            dots.forEach(d => d.classList.remove('active'));
            
            slides[i].classList.add('active-slide');
            if (dots[i]) dots[i].classList.add('active');
        };

        const nextSlide = () => {
            index = (index + 1) % slides.length;
            show(index);
        };

        const prevSlide = () => {
            index = (index - 1 + slides.length) % slides.length;
            show(index);
        };

        // Automatic Timer
        const start = () => timer = setInterval(nextSlide, 5000);
        const stop = () => clearInterval(timer);

        // Buttons
        if (next) next.onclick = () => { stop(); nextSlide(); start(); };
        if (prev) prev.onclick = () => { stop(); prevSlide(); start(); };

        // Dots
        dots.forEach((d, i) => {
            d.onclick = () => { stop(); index = i; show(i); start(); };
        });

        start();
    };

    // Dono functions ko run karein
    setupDropdown();
    setupSlider();
});
function toggleUserStatus() {
    const loggedOut = document.getElementById('logged-out-view');
    const loggedIn = document.getElementById('logged-in-view');

    if (loggedOut.style.display === "none") {
        loggedOut.style.display = "block";
        loggedIn.style.display = "none";
    } else {
        loggedOut.style.display = "none";
        loggedIn.style.display = "block";
    }
}
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('moosaUser');

    if (isLoggedIn === 'true') {
        document.getElementById('logged-out-view').style.display = "none";
        document.getElementById('logged-in-view').style.display = "block";
        
        // My Account ki jagah user ka naam dikhane ke liye
        if(userName) {
            document.querySelector('.user-name-text').innerText = userName;
        }
    }
};

// Logout Function
function logout() {
    localStorage.clear();
    window.location.reload();
}