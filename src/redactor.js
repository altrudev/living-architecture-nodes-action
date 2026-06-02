'use strict';

const SECRET_PATTERNS = [
  /ghp_[A-Za-z0-9_]{20,}/g,
  /github_pat_[A-Za-z0-9_]{20,}/g,
  /sk-[A-Za-z0-9]{20,}/g,
  /AKIA[0-9A-Z]{16}/g,
  /(?<=password\s*[=:]\s*)[^\s]+/gi,
  /(?<=token\s*[=:]\s*)[^\s]+/gi,
  /(?<=api[_-]?key\s*[=:]\s*)[^\s]+/gi
];

function redactString(value) {
  let next = value;
  for (const pattern of SECRET_PATTERNS) {
    next = next.replace(pattern, '[REDACTED]');
  }
  return next;
}

function redactObject(value) {
  if (typeof value === 'string') return redactString(value);
  if (Array.isArray(value)) return value.map(redactObject);
  if (!value || typeof value !== 'object') return value;

  const output = {};
  for (const [key, item] of Object.entries(value)) {
    if (/secret|token|password|api[_-]?key|private[_-]?key/i.test(key)) {
      output[key] = '[REDACTED]';
    } else {
      output[key] = redactObject(item);
    }
  }
  return output;
}

module.exports = {
  redactString,
  redactObject
};
