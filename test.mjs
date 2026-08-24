import assert from 'node:assert/strict';
import { buildDystinyUrl, buildQuestion, lensQuestions } from './app.js';

assert.equal(Object.keys(lensQuestions).length, 4);
assert.match(buildQuestion('control', 'AI-assisted delivery'), /oversight or control/i);
assert.match(buildQuestion('control', 'AI-assisted delivery'), /Decision to examine: AI-assisted delivery/);
assert.match(buildDystinyUrl('people', ''), /utm_content=lens_people/);
assert.match(buildDystinyUrl('not-valid', ''), /utm_content=lens_value/);
console.log('dystiny-tradeoff-question-starter tests passed');
