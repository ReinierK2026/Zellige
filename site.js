/* Zellige site behaviour.
   Forms are demo-only: they show the confirmation state without sending.
   To go live, give each <form> an action (Formspree, Netlify Forms, Tally…)
   and delete the preventDefault block below. */
document.querySelectorAll('form[data-form]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    if (!form.reportValidity()) return;
    e.preventDefault();
    form.classList.add('done');
    var sent = form.parentElement.querySelector('.sent');
    if (sent) { sent.style.display = 'flex'; sent.scrollIntoView({ block: 'nearest' }); }
    var note = document.getElementById('lockNote');
    if (note) note.textContent = 'We\u2019ll take you through this on our call.';
  });
});
document.querySelectorAll('[data-reset]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var panel = btn.closest('.panel') || document;
    var form = panel.querySelector('form[data-form]');
    var sent = panel.querySelector('.sent');
    if (form) { form.classList.remove('done'); form.reset(); }
    if (sent) sent.style.display = 'none';
  });
});

/* Finance Health Check */
(function () {
  var opts = document.querySelectorAll('.q .opts button');
  if (!opts.length) return;
  var answers = {};
  var AREAS = ['Planning', 'Governance', 'Controls', 'Liquidity', 'Risk'];

  function paint() {
    var answered = 0, total = 0;
    for (var k in answers) { answered++; total += answers[k]; }
    var done = answered === 10;
    var score = answered ? Math.round(total / (answered * 2) * 100) : 0;
    document.getElementById('progress').textContent = done ? 'All 10 answered' : answered + ' of 10 answered';
    document.getElementById('progressFill').style.width = (answered * 10) + '%';
    document.getElementById('scoreText').textContent = answered ? String(score) : '…';

    var band = 'Answer the questions to see your score';
    var advice = 'Your overall score appears here as you answer.';
    if (answered) {
      if (score >= 80) { band = 'Strong foundations'; advice = 'Your finance function looks well governed. The next step is usually long-range scenarios and capital planning.'; }
      else if (score >= 55) { band = 'Solid, with gaps'; advice = 'Good basics, with at least one exposed area. That is usually the first thing a board or accreditor probes.'; }
      else { band = 'Needs attention'; advice = 'Several fundamentals need work. Fractional CFO support would set priorities and fix them in order.'; }
      if (!done) band += ' · so far';
    }
    document.getElementById('band').textContent = band;
    document.getElementById('advice').textContent = advice;
    document.getElementById('locked').hidden = !done;
    document.getElementById('hcForm').hidden = !done;
    var s = document.getElementById('hcScore'), a = document.getElementById('hcAnswers');
    if (s) s.value = String(score);
    if (a) a.value = JSON.stringify(answers);
  }

  opts.forEach(function (b) {
    b.addEventListener('click', function () {
      var q = b.dataset.q;
      answers[q] = Number(b.dataset.v);
      b.parentElement.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
      paint();
    });
  });
  document.getElementById('hcReset').addEventListener('click', function () {
    answers = {};
    opts.forEach(function (x) { x.setAttribute('aria-checked', 'false'); });
    var f = document.querySelector('#hcForm form'); if (f) { f.classList.remove('done'); f.reset(); }
    var sent = document.querySelector('#hcForm .sent'); if (sent) sent.style.display = 'none';
    paint();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  paint();
})();
