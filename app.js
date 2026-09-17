/**
 * MADHESH N - BENTO GRID PORTFOLIO INTERACTIVE LOGIC
 * Professional Corporate Theme
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
          card.style.transform = 'scale(0.97)';
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
   2. Piston API Code Playground Simulator
   ========================================================================== */
function initCodePlayground() {
  const runBtn = document.getElementById('runCodeBtn');
  const codeOutput = document.getElementById('codeOutput');

  if (!runBtn || !codeOutput) return;

  const mockExecution = {
    python: `[Piston Engine] Executing Python 3.10...
------------------------------------------------
Parsing Candidate Profile: Candidate_Madhesh.pdf
Matched Skill Vectors: ['React.js', 'FastAPI', 'MongoDB', 'Vector Search']
Match Rating: 96.5% - Recommended for Engineering Interview.
Execution Latency: 38ms | Memory: 11.8MB`,
    
    javascript: `[Piston Engine] Executing Node.js Environment...
------------------------------------------------
Auth Token Verification: Valid (Role: Senior Engineering Lead)
Test Suite Summary: 5/5 Automated Code Tests Passed.
Status: Execution Sandbox Verified.`
  };

  runBtn.addEventListener('click', () => {
    codeOutput.innerHTML = `<span style="color: var(--accent-blue);"><i class="fa-solid fa-spinner fa-spin"></i> Executing code in isolated container...</span>`;
    
    setTimeout(() => {
      const selectedLang = document.getElementById('langSelect').value;
      codeOutput.innerHTML = mockExecution[selectedLang] || mockExecution.python;
      showToast('Piston Code Assessment Executed Successfully');
    }, 500);
  });
}

/* ==========================================================================
   3. Interactive Detail Modals
   ========================================================================== */
const projectDetailsData = {
  distop: {
    title: "Distop AI – Infrastructure Monitoring Platform",
    stack: "React, FastAPI, Python, MongoDB, Docker",
    description: `Distop AI is a microservice monitoring platform designed for real-time system metrics tracking, machine-learning anomaly detection, and NLP root-cause incident triage.`,
    features: [
      "Machine Learning anomaly detection models monitoring CPU, Memory, and Network spikes.",
      "NLP-driven root cause analysis outputting structured incident summaries.",
      "Responsive metric dashboards with real-time WebSocket telemetry.",
      "Dockerized architecture for seamless containerized deployment."
    ],
    github: "https://github.com/MadheshN-eng"
  },
  hrscreening: {
    title: "AI-Powered HR Screening & Assessment Platform",
    stack: "MERN Stack, TypeScript, AI, Piston API",
    description: `An end-to-end recruitment application engineered for automated resume parsing, skill vector matching, and live multi-language code evaluation.`,
    features: [
      "Automated candidate resume parsing and vector search scoring.",
      "Integrated Piston API for sandboxed multi-language code evaluation.",
      "Role-based JWT authentication for recruiters and candidate workflows.",
      "Streamlined candidate tracking and assessment pipelines."
    ],
    github: "https://github.com/MadheshN-eng"
  },
  crackerscraze: {
    title: "Crackers Craze – Bulk Ordering & Comparison Platform",
    stack: "React, Tailwind CSS, Supabase, Node.js, Express.js",
    description: `A full-stack bulk e-commerce platform equipped with OTP authentication, dynamic pricing comparison, and vendor product management.`,
    features: [
      "Dynamic price comparison engine for bulk product categories.",
      "OTP-based registration and secure checkout workflow.",
      "Vendor inventory administration panel with real-time updates.",
      "Supabase database integration with cloud data synchronization."
    ],
    github: "https://github.com/MadheshN-eng"
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
   4. Copy Email & Toast Notifications
   ========================================================================== */
function copyEmail() {
  const email = 'madheshdeepak71@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('📧 Email copied: madheshdeepak71@gmail.com');
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
        animateValue(entry.target, 0, target, 1200);
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
