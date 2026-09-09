(() => {
  const form = document.getElementById('career-form');
  const status = document.getElementById('application-status');
  const recipient = window.HBX_CAREERS?.applicationEmail || 'careers@hbxsolar.in';
  document.querySelector('.earnings-trigger')?.addEventListener('click', () => {
    document.getElementById('compensation-details').open = true;
  });
  if ('IntersectionObserver' in window) {
    const applyLink = document.querySelector('.mobile-apply');
    new IntersectionObserver(entries => {
      applyLink.hidden = entries[0].isIntersecting;
    }).observe(document.getElementById('application'));
  }
  const draft = document.getElementById('email-draft');
  const draftBody = document.getElementById('email-body');
  const reopen = document.getElementById('open-email');
  const fields = [
    ['full_name', 'Full Name'], ['mobile_number', 'Mobile Number'],
    ['whatsapp_number', 'WhatsApp Number'], ['email_address', 'Email Address'],
    ['city', 'City'], ['district', 'District'], ['education', 'Highest Education'],
    ['sales_experience', 'Sales Experience'], ['current_occupation', 'Current Occupation'],
    ['motivation', 'Why do you want to join HBX Solar?']
  ];
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = 'Dear HBX Solar Recruitment Team,\r\n\r\nI would like to apply for the Work From Home sales / business development opportunity.\r\n\r\n'
      + fields.map(([key, label]) => label + ': ' + String(data.get(key) || '').trim()).join('\r\n\r\n')
      + '\r\n\r\nConsent: I confirm my information is accurate and agree to be contacted by HBX Solar about this opportunity.\r\n\r\nResume: Optional — attach your resume to this email before sending.\r\n\r\nThank you.';
    const subject = 'HBX Solar Career Application - ' + String(data.get('full_name')).replace(/[\r\n]+/g, ' ').trim();
    const url = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    draftBody.value = body;
    reopen.href = url;
    draft.hidden = false;
    status.textContent = 'Your email draft is ready. Click Send in your email app to apply to ' + recipient + '. Attach your resume there if needed. This website cannot confirm email delivery.';
    window.location.href = url;
  });
  document.getElementById('copy-application').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draftBody.value);
      status.textContent = 'Application details copied. Paste them into an email to ' + recipient + ', attach your resume if needed, and click Send.';
    } catch {
      draftBody.focus();
      draftBody.select();
      status.textContent = 'Select and copy the details below, then email them to ' + recipient + '.';
    }
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.section-head,.journey article').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
  }
})();
