// AI Neural Network Animation
// Konfigurasi untuk animasi AI
window.aiNetworkConfig = {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": ["#4285f4", "#ea4335", "#fbbc05", "#34a853"] // Warna AI-themed
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.7,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#4285f4",
                "opacity": 0.5,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi particles.js dengan konfigurasi AI
    particlesJS('particles-js', window.aiNetworkConfig);

    // Efek tambahan untuk simulasi proses AI
    setInterval(function() {
        // Pilih beberapa partikel secara acak untuk "aktivasi"
        const canvas = document.querySelector('#particles-js canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const pulseSize = Math.random() * 50 + 20;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            
            // Animasi pulse untuk simulasi aktivasi neuron
            let alpha = 0.5;
            let size = 0;
            const interval = setInterval(function() {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(66, 133, 244, ${alpha})`;
                ctx.fill();
                
                size += 2;
                alpha -= 0.02;
                
                if (alpha <= 0) {
                    clearInterval(interval);
                }
            }, 20);
        }
    }, 2000);
});