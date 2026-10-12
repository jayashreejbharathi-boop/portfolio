/**
 * Jayashree M B — Portfolio Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Init Typewriter Effect
  initTypewriter();

  // Init Intersection Observer for Scroll Reveals
  initScrollReveal();

  // Init Mobile Nav
  initMobileMenu();

  // Set default active filter
  filterProjects('all');
});

// ==========================================
// 1. TYPEWRITER EFFECT
// ==========================================
const typewriterRoles = [
  "Computer Science Engineer",
  "AI & Generative AI Specialist",
  "Data Structures & Algorithms (C++)",
  "Computer Vision & OpenCV Developer",
  "Cloud & Machine Learning Practitioner"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElem = document.getElementById('typing-text');

function initTypewriter() {
  if (!typewriterElem) return;

  const currentRole = typewriterRoles[roleIndex];

  if (isDeleting) {
    typewriterElem.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElem.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 35 : 75;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 2200; // Pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typewriterRoles.length;
    delay = 450;
  }

  setTimeout(initTypewriter, delay);
}

// ==========================================
// 2. SCROLL REVEAL OBSERVER
// ==========================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ==========================================
// 3. MOBILE MENU TOGGLE
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close when clicking nav links
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ==========================================
// 4. PROJECT CATEGORY FILTERING
// ==========================================
function filterProjects(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat.includes(category)) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 30);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px) scale(0.97)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 250);
    }
  });
}

// ==========================================
// 5. PROJECT DETAILS MODAL
// ==========================================
const projectDatabase = {
  farming: {
    title: "AI-Augmented Smart Farming System using Digital Twin & AI",
    badge: "IoT • Digital Twin • AI • Blockchain",
    tech: ["Python", "Machine Learning", "Digital Twin", "Blockchain", "IoT", "ESP32", "Flask", "MQTT"],
    summary: "An intelligent, end-to-end IoT and AI-driven precision farming infrastructure designed for real-time crop telemetry, automated irrigation, groundnut disease prediction, and tamper-proof agricultural records.",
    architecture: [
      "Real-time sensor data ingestion via ESP32 microcontrollers monitoring soil moisture, temperature, and humidity over MQTT.",
      "Digital Twin simulation replicating environmental microclimates to forecast soil moisture depletion and optimize automated drip irrigation schedules.",
      "Computer vision & Deep Learning model running edge inference to detect and classify groundnut leaf diseases with high accuracy.",
      "Blockchain-backed ledger logging water consumption metrics and harvest telemetry for verifiable agricultural supply chain transparency."
    ],
    github: "https://github.com/jayashreejbharathi-boop"
  },
  reviewer: {
    title: "AI Code Reviewer using AWS SageMaker",
    badge: "Cloud ML • DevOps • GenAI",
    tech: ["Python", "AWS SageMaker", "Amazon S3", "Streamlit", "Machine Learning", "AST Parser"],
    summary: "A cloud-native developer copilot that automates Python source code reviews, identifies syntax errors, flags anti-patterns, and delivers intelligent complexity optimization suggestions in real time.",
    architecture: [
      "Integrated AWS SageMaker serverless endpoints hosting custom code evaluation models trained for semantic code comprehension.",
      "Amazon S3 data pipeline for versioned storage of analysis reports, diff logs, and benchmark metrics.",
      "Streamlit web interface offering developers interactive code submission, real-time syntax linting, and line-by-line recommendation diffs.",
      "Automated complexity analyzer recommending algorithmic refactoring to reduce Big-O runtime and memory footprints."
    ],
    github: "https://github.com/jayashreejbharathi-boop"
  },
  fabric: {
    title: "Fabric Thread Matching System",
    badge: "Computer Vision • Image Processing",
    tech: ["Python", "OpenCV", "JavaScript", "NumPy", "HTML5 Canvas"],
    summary: "An automated textile inspection and pattern matching system built with OpenCV to detect fabric yarn density, thread alignment, and textile weave characteristics.",
    architecture: [
      "Advanced image preprocessing incorporating adaptive thresholding, morphological transformations, and Canny edge filtering to segment delicate textile threads.",
      "Feature extraction algorithms evaluating thread density, warp/weft spacing, and fabric grain alignment.",
      "High-speed pattern comparison matching scanned production samples against golden standard specifications.",
      "Interactive JavaScript telemetry interface presenting visual heatmaps and pass/fail inspection metrics."
    ],
    github: "https://github.com/jayashreejbharathi-boop"
  }
};

function openProjectModal(key) {
  const item = projectDatabase[key];
  if (!item) return;

  const modal = document.getElementById('project-modal');
  const container = document.getElementById('modal-content');

  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between pb-3 border-b border-white/10">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium badge-tech">
          ${item.badge}
        </span>
        <button onclick="closeProjectModal()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-white mb-2">${item.title}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${item.summary}</p>
      </div>

      <div class="space-y-3">
        <h4 class="text-xs font-mono uppercase tracking-widest text-[#00f0ff] font-bold">Key Architectural Highlights</h4>
        <div class="space-y-2.5">
          ${item.architecture.map(point => `
            <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-white/[0.02] p-3 rounded-lg border border-white/5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-[#00f0ff] flex-shrink-0 mt-0.5"></i>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="space-y-2">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">Technologies Utilized</h4>
        <div class="flex flex-wrap gap-2">
          ${item.tech.map(t => `
            <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-[#080d1a] border border-[#00f0ff]/20 text-[#00f0ff]">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        <button onclick="closeProjectModal()" class="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          Close
        </button>
        <a href="${item.github}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0284c7] text-[#080d1a] font-bold text-sm flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
          <i data-lucide="github" class="w-4 h-4"></i> View Repository
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

document.getElementById('project-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// ==========================================
// 6. COPY TO CLIPBOARD & TOAST NOTIFICATION
// ==========================================
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Could not copy: ${text}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2800);
}

// ==========================================
// 7. CONTACT FORM SUBMISSION
// ==========================================
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('sender-name')?.value || '';
  const email = document.getElementById('sender-email')?.value || '';
  const subject = document.getElementById('sender-subject')?.value || 'Portfolio Contact';
  const message = document.getElementById('sender-message')?.value || '';

  const mailtoUrl = `mailto:j36049840@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Jayashree,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  
  window.open(mailtoUrl, '_blank');
  showToast("Opening email client to send message!");
  event.target.reset();
}
