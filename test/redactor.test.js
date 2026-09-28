'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { redactString, redactObject } = require('../src/redactor');

test('common credential shapes are redacted from diagnostic values', () => {
  assert.equal(redactString('token=ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZ123456'), 'token=[REDACTED]');
  assert.equal(redactObject({ api_key: 'secret-value' }).api_key, '[REDACTED]');
});
