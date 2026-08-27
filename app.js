export const lensQuestions = Object.freeze({
  value: 'What measurable benefit is claimed, what cost or risk is shifted, who experiences each, and which primary or operational evidence would support the comparison?',
  control: 'What becomes faster, what oversight or control changes, which failures remain reversible, and what evidence would show whether the tradeoff is acceptable?',
  certainty: 'What is measured versus inferred, where does uncertainty enter, which counterexamples matter, and which primary evidence could confirm or weaken the conclusion?',
  people: 'Who gains access or capability, who may be excluded or harmed, how reversible are the impacts, and which affected-group and primary-source evidence should be compared?'
});

export function buildQuestion(lens = 'value', topic = '', changeTest = '') {
  const base = lensQuestions[lens] ?? lensQuestions.value;
  const clean = String(topic).trim().replace(/\s+/g, ' ').slice(0, 220);
  const cleanChangeTest = String(changeTest).trim().replace(/\s+/g, ' ').slice(0, 180);
  const subject = clean ? `${base} Decision to examine: ${clean}.` : base;
  return cleanChangeTest ? `${subject} Evidence that would change the decision: ${cleanChangeTest}.` : subject;
}

export function buildDystinyUrl(lens = 'value', topic = '', changeTest = '') {
  const valid = Object.hasOwn(lensQuestions, lens) ? lens : 'value';
  const url = new URL('https://dystiny.com/answer/');
  url.searchParams.set('q', buildQuestion(valid, topic, changeTest));
  url.searchParams.set('utm_source', 'github');
  url.searchParams.set('utm_medium', 'owned_research');
  url.searchParams.set('utm_campaign', 'tradeoff_question_starter');
  url.searchParams.set('utm_content', `lens_${valid}`);
  return url.toString();
}

function init() {
  const form = document.querySelector('[data-builder]');
  if (!form) return;
  const topic = document.querySelector('#topic');
  const changeTest = document.querySelector('#change-test');
  const radios = [...form.querySelectorAll('input[name="lens"]')];
  const question = document.querySelector('[data-question]');
  const open = document.querySelector('[data-open]');
  const copy = document.querySelector('[data-copy]');
  const lens = () => radios.find((radio) => radio.checked)?.value ?? 'value';

  function render() {
    question.textContent = buildQuestion(lens(), topic.value, changeTest.value);
    open.href = buildDystinyUrl(lens(), topic.value, changeTest.value);
  }

  async function copyQuestion() {
    await navigator.clipboard.writeText(question.textContent);
    copy.textContent = 'Question copied';
    window.setTimeout(() => { copy.textContent = 'Copy question'; }, 1800);
  }

  radios.forEach((radio) => radio.addEventListener('change', render));
  topic.addEventListener('input', render);
  changeTest.addEventListener('input', render);
  copy.addEventListener('click', () => copyQuestion().catch(() => { copy.textContent = 'Copy unavailable'; }));
  render();
}

if (typeof document !== 'undefined') init();
