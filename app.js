/**
 * MADHESH N - BENTO GRID PORTFOLIO INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFiltering();
  initCodePlayground();
  initModalInteractions();
  initStatCounters();
});

/* ==========================================================================
   1. Tech Stack Filtering Logic
   ========================================================================== */
function initProjectFiltering() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Remove active class from all chips
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-tech') || '';
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (!card.getAttribute('data-tech').includes(filter) && filter !== 'all') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   2. Interactive Piston API Live Code Playground Simulator
   ========================================================================== */
function initCodePlayground() {
  const runBtn = document.getElementById('runCodeBtn');
  const codeOutput = document.getElementById('codeOutput');
  const codeEditor = document.getElementById('codeEditor');

  if (!runBtn || !codeOutput) return;

  const mockExecution = {
    python: `🚀 [Piston API Engine] Executing Python 3.10...
------------------------------------------------
Scanning Resume: candidate_madhesh.pdf...
Matching Skills: ['React.js', 'FastAPI', 'MongoDB', 'AI/Vector Search']
Match Score: 96.5% - QUALIFIED FOR TECHNICAL INTERVIEW!
Execution Time: 42ms | Memory: 12.4MB`,
    
    javascript: `🚀 [Piston API Engine] Executing TypeScript/Node.js...
------------------------------------------------
Role Auth Check: JWT Verified (Role: Senior Technical Lead)
Assessment Test Suite: 5/5 Unit Tests Passed
Status: Code Execution Sandbox Ready.`
  };

  runBtn.addEventListener('click', () => {
    codeOutput.innerHTML = `<span style="color: var(--accent-amber);">⚡ Executing code via Piston API container...</span>`;
    
    setTimeout(() => {
      const selectedLang = document.getElementById('langSelect').value;
      codeOutput.innerHTML = mockExecution[selectedLang] || mockExecution.python;
      showToast('Piston API Code Sandbox executed cleanly!');
    }, 600);
  });
}

/* ==========================================================================
   3. Interactive Detail Modals
   ========================================================================== */
const projectDetailsData = {
  distop: {
    title: "Distop AI – AI-Powered Infrastructure Monitoring Platform",
    stack: "React, FastAPI, Python, MongoDB, Docker",
    description: `Distop AI is a high-performance infrastructure monitoring suite built to deliver real-time metrics, predictive anomaly detection, and natural language root-cause analysis for microservices.`,
    features: [
      "Machine Learning anomaly detection algorithms tracking CPU, Memory & Network spikes.",
      "NLP-driven root cause analysis providing human-readable incident summaries.",
      "Responsive metric dashboards with real-time WebSocket updates.",
      "Dockerized microservice architecture for seamless deployment."
    ],
    github: "https://github.com/MadheshN-eng",
    demo: "#"
  },
  hrscreening: {
    title: "AI-Powered HR Screening & Code Assessment Application",
    stack: "MERN Stack, TypeScript, AI, Piston API",
    description: `An end-to-end automated recruitment platform built for automated resume parsing, candidate scoring, and live multi-language code execution.`,
    features: [
      "Automated candidate resume screening using vector search & skill matching.",
      "Integrated Piston API for isolated code evaluation across Python, Java, C, and JS.",
      "Role-based JWT authentication for recruiters, candidates, and admins.",
      "Streamlined candidate tracking and evaluation workflows."
    ],
    github: "https://github.com/MadheshN-eng",
    demo: "#"
  },
  crackerscraze: {
    title: "Crackers Craze – Bulk Product & Ordering Platform",
    stack: "React, Tailwind CSS, Supabase, Node.js, Express.js",
    description: `A full-stack bulk ecommerce and comparison engine equipped with OTP user verification and vendor product management.`,
    features: [
      "Dynamic price comparison engine for bulk products.",
      "OTP-based authentication & checkout workflow.",
      "Vendor-wise product inventory management panel.",
      "Supabase database integration with real-time updates."
    ],
    github: "https://github.com/MadheshN-eng",
    demo: "#"
  }
};

function initModalInteractions() {
  const modalOverlay = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!modalOverlay || !closeModalBtn) return;

  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

function openProjectModal(projectId) {
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalStack = document.getElementById('modalStack');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalGithub = document.getElementById('modalGithub');

  const data = projectDetailsData[projectId];
  if (!data) return;

  modalTitle.innerText = data.title;
  modalStack.innerText = `Tech Stack: ${data.stack}`;
  modalDesc.innerText = data.description;
  
  modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  modalGithub.href = data.github;

  modalOverlay.classList.add('active');
}

/* ==========================================================================
   4. One-Click Copy Email & Toast Notifications
   ========================================================================== */
function copyEmail() {
  const email = 'madheshdeepak71@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('📧 Email copied to clipboard: madheshdeepak71@gmail.com');
  }).catch(() => {
    showToast('📧 Email: madheshdeepak71@gmail.com');
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.innerHTML = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   5. Stat Counter Animation
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateValue(entry.target, 0, target, 1500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentVal = Math.floor(progress * (end - start) + start);
    obj.innerHTML = currentVal.toLocaleString() + '+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
