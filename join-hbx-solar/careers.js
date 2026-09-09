(() => {
  const form = document.getElementById('career-form');
  const status = document.getElementById('application-status');
  const resume = document.getElementById('resume');
  const endpoint = window.HBX_CAREERS?.applicationEndpoint;
  if ('IntersectionObserver' in window) {
    const applyLink = document.querySelector('.mobile-apply');
    new IntersectionObserver(entries => {
      applyLink.hidden = entries[0].isIntersecting;
    }).observe(document.getElementById('application'));
  }
  if (endpoint) status.textContent = 'Your details will be sent to HBX Solar’s recruitment team when you submit.';
  resume.addEventListener('change', () => {
    const file = resume.files[0];
    resume.setCustomValidity(file && (file.size > 5 * 1024 * 1024 || !/\.(pdf|docx?)$/i.test(file.name)) ? 'Choose a PDF, DOC or DOCX file no larger than 5 MB.' : '');
    resume.reportValidity();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!endpoint) {
      status.textContent = 'Online applications are not active yet. Your information has not been sent. Please contact HBX Solar on +91 86086 92218 to confirm how to apply.';
      status.focus();
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Submitting…';
    status.textContent = 'Sending your application securely…';
    try {
      const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), signal: AbortSignal.timeout(30000) });
      if (!response.ok || (await response.json()).success !== true) throw new Error('Not accepted');
      form.reset();
      status.textContent = 'Application Submitted Successfully. Thank you for your interest in joining HBX Solar. Our recruitment team will review your application and contact shortlisted candidates.';
      button.textContent = 'Application submitted';
    } catch {
      status.textContent = 'We could not confirm submission. Your entries are still here. Please contact HBX Solar before retrying if you are unsure whether your application arrived.';
      button.disabled = false;
      button.textContent = 'Retry submission';
    }
    status.focus();
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.section-head,.journey article').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  }
})();
