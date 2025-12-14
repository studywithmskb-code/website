document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       Mobile Menu Toggle
    ================================ */
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* ===============================
       Smooth Scroll for Anchor Links
    ================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    /* ===============================
       Scroll Animation (IntersectionObserver)
    ================================ */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .hero p, .hero h1').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    /* ===============================
       Dynamic YouTube Video Loader
       (SAFE – No Error 153)
    ================================ */
    document.querySelectorAll(".dynamic-video").forEach(div => {
        const url = div.getAttribute("data-video-url");
        if (!url) return;

        let videoId = "";

        if (url.includes("watch?v=")) {
            videoId = url.split("watch?v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        }

        if (!videoId) return;

        const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        // Show thumbnail first (safe for scheduled videos)
        div.innerHTML = `
            <div style="position:relative; cursor:pointer;">
                <img src="${thumbnail}" style="width:100%; border-radius:12px;">
                <div style="
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    background:#ff0000;
                    color:#fff;
                    padding:10px 18px;
                    border-radius:50px;
                    font-weight:bold;
                    font-size:16px;
                ">
                    ▶ Play
                </div>
            </div>
        `;

        // Load iframe ONLY on click
        div.addEventListener("click", () => {
            div.innerHTML = `
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;
        });
    });

});

/* ===============================
   Helper: Open Link in New Tab
=============================== */
function openInNewTab(url) {
    const win = window.open(url, '_blank');
    if (win) win.focus();
}

/* ===============================
   Modal Logic
=============================== */
let currentModalType = '';

function openSelectionModal(type) {
    const modal = document.getElementById('selectionModal');
    const websiteBtn = document.getElementById('modalWebsiteBtn');
    const youtubeBtn = document.getElementById('modalYoutubeBtn');

    currentModalType = type;

    if (type === 'python') {
        websiteBtn.onclick = () => window.location.href = 'subpages/python.html';
        youtubeBtn.onclick = () => openInNewTab(
            'https://www.youtube.com/playlist?list=PLKqbY-udh9zWfzNFSfgR18OpXsXlvfMj_'
        );
    }
    else if (type === 'jarvis') {
        websiteBtn.onclick = () => window.location.href = 'subpages/JarvisAI.html';
        youtubeBtn.onclick = () => openInNewTab(
            'https://www.youtube.com/playlist?list=PLKqbY-udh9zUHLG2zO3VwMI64EozjR8Xj'
        );
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeSelectionModal() {
    const modal = document.getElementById('selectionModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

window.onclick = function (event) {
    const modal = document.getElementById('selectionModal');
    if (event.target === modal) {
        closeSelectionModal();
    }
};
