// Mendapatkan konfigurasi animasi AI dari ai-background.js
let aiNetworkConfig;

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const navDotsContainer = document.querySelector('.nav-dots');
    const presentationContainer = document.querySelector('.presentation-container');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const videoContainer = document.querySelector('.video-container');
    let isScrolling = false;
    
    let currentSlide = 0;
    
    // Mendapatkan konfigurasi animasi AI
    aiNetworkConfig = window.aiNetworkConfig;

    // Buat dot navigasi berdasarkan jumlah slide
    function createNavDots() {
        navDotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('nav-dot');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlide(index);
            });
            navDotsContainer.appendChild(dot);
        });
    }

    // Fungsi untuk menampilkan slide tertentu
    function showSlide(index) {
        currentSlide = index;
        
        // Update active class pada slide
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update active class pada dots
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Buat dot navigasi saat halaman dimuat
    createNavDots();

    // Event listener untuk tombol fullscreen
    // fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Event listener untuk tombol next
    nextBtn.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    });

    // Event listener untuk tombol prev
    prevBtn.addEventListener('click', () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        } else if (e.key === 'f' || e.key === 'F') {
            toggleFullscreen();
        }
    });
    
    // Fungsi untuk toggle fullscreen
function toggleFullscreen() {
    // Buat container untuk fullscreen yang mencakup particles-js dan presentation-container
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.id = 'fullscreen-container';
    fullscreenContainer.style.position = 'fixed';
    fullscreenContainer.style.top = '0';
    fullscreenContainer.style.left = '0';
    fullscreenContainer.style.width = '100%';
    fullscreenContainer.style.height = '100%';
    fullscreenContainer.style.zIndex = '9999';
    
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        // Masuk mode fullscreen
        
        // Cek apakah fullscreen-container sudah ada
        if (!document.getElementById('fullscreen-container')) {
            // Buat elemen particles-js baru untuk fullscreen
            const particlesElement = document.createElement('div');
            particlesElement.id = 'particles-js-fullscreen';
            particlesElement.style.position = 'absolute';
            particlesElement.style.top = '0';
            particlesElement.style.left = '0';
            particlesElement.style.width = '100%';
            particlesElement.style.height = '100%';
            particlesElement.style.zIndex = '0';
            
            // Tambahkan ke DOM
            document.body.appendChild(fullscreenContainer);
            fullscreenContainer.appendChild(particlesElement);
            fullscreenContainer.appendChild(presentationContainer);
            
            // Inisialisasi animasi neuron AI pada elemen baru
            particlesJS('particles-js-fullscreen', aiNetworkConfig);
        }
        
        // Request fullscreen pada container
        if (fullscreenContainer.requestFullscreen) {
            fullscreenContainer.requestFullscreen();
        } else if (fullscreenContainer.msRequestFullscreen) {
            fullscreenContainer.msRequestFullscreen();
        } else if (fullscreenContainer.mozRequestFullScreen) {
            fullscreenContainer.mozRequestFullScreen();
        } else if (fullscreenContainer.webkitRequestFullscreen) {
            fullscreenContainer.webkitRequestFullscreen();
        }
    } else {
        // Keluar dari mode fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        
        // Kembalikan elemen ke posisi semula setelah keluar dari fullscreen
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                const fullscreenContainer = document.getElementById('fullscreen-container');
                if (fullscreenContainer) {
                    document.body.insertBefore(presentationContainer, document.body.firstChild);
                    fullscreenContainer.remove();
                }
            }
        });
    }
}

    // Swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const xDiff = touchStartX - touchEndX;
        const yDiff = touchStartY - touchEndY;
        
        // Determine if horizontal or vertical swipe
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 50) {
                // Swipe left, go to next slide
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            } else if (xDiff < -50) {
                // Swipe right, go to previous slide
                const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
        } else {
            if (yDiff > 50) {
                // Swipe up, go to next slide
                const nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            } else if (yDiff < -50) {
                // Swipe down, go to previous slide
                const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
        }
    }
    if (presentationContainer) {
        presentationContainer.addEventListener('scroll', function() {
            if (isScrolling) return;
            
            const scrollPosition = presentationContainer.scrollTop;
            
            slides.forEach((slide, index) => {
                const offsetTop = slide.offsetTop;
                const slideHeight = slide.offsetHeight;
                
                if (scrollPosition >= offsetTop - slideHeight/3 && 
                    scrollPosition < offsetTop + slideHeight - slideHeight/3) {
                    if (currentSlide !== index) {
                        document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
                        document.querySelectorAll('.nav-dot')[index].classList.add('active');
                        currentSlide = index;
                    }
                }
            });
        });
    }

    // Inisialisasi slide pertama
    showSlide(0);
    
    // Fungsi untuk fullscreen video
    if (fullscreenBtn && videoContainer) {
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement &&
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement) {
                // Masuk mode fullscreen
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                } else if (videoContainer.mozRequestFullScreen) {
                    videoContainer.mozRequestFullScreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                }
            } else {
                // Keluar dari mode fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        });
    }
});