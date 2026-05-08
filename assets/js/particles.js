/**
 * Subtle Particle Animation Background
 * Modern 2026 Portfolio Style - Less Overpowering
 */

class ParticleBackground {
    constructor(canvasId = 'particles-bg') {
        this.container = document.getElementById(canvasId);
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];

        this.setupCanvas();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.setupCanvas());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.container.innerHTML = '';
        this.container.appendChild(this.canvas);
    }

    createParticles() {
        this.particles = [];
        // Reduced particle count for subtlety
        const particleCount = Math.min(Math.max(window.innerWidth / 15, 15), 50);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Slower movement
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1 + 0.5, // Smaller particles
                opacity: Math.random() * 0.3 + 0.1, // More transparent
                color: this.getRandomColor(),
            });
        }
    }

    getRandomColor() {
        // More subtle colors
        const colors = [
            'rgba(99, 102, 241, 0.15)',   // Primary purple - more transparent
            'rgba(139, 92, 246, 0.12)',  // Secondary purple
            'rgba(6, 182, 212, 0.1)',    // Cyan accent
            'rgba(99, 102, 241, 0.08)',   // Lighter purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    updateParticles() {
        this.particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }

            // Wrap around
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Subtle mouse interaction
            if (this.mouseX && this.mouseY) {
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) { // Smaller interaction radius
                    const angle = Math.atan2(dy, dx);
                    particle.vx -= Math.cos(angle) * 0.1; // Less responsive
                    particle.vy -= Math.sin(angle) * 0.1;
                }
            }

            // Limit velocity
            const maxVelocity = 0.8;
            const velocity = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
            if (velocity > maxVelocity) {
                particle.vx = (particle.vx / velocity) * maxVelocity;
                particle.vy = (particle.vy / velocity) * maxVelocity;
            }
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw lines between nearby particles - more subtle
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) { // Shorter connection distance
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.05 * (1 - distance / 80)})`; // More transparent
                    this.ctx.lineWidth = 0.5; // Thinner lines
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        this.particles.forEach((particle) => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleBackground('particles-bg');
    });
} else {
    new ParticleBackground('particles-bg');
}
        });
    }

drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw lines between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                this.ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - distance / 100)})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                this.ctx.stroke();
            }
        }
    }

    // Draw particles
    this.particles.forEach((particle) => {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fill();
    });
}

animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
}
}

// Initialize particle background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleBackground('particles-bg');
    });
} else {
    new ParticleBackground('particles-bg');
}
