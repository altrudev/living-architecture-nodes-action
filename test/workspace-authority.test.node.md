# test/workspace-authority.test.js — Living Architecture Node

## Purpose

Adversarial regression tests for the Action filesystem authority boundary.

## Coverage

- repository root and subdirectory acceptance;
- parent traversal rejection;
- absolute export rejection;
- symbolic-link escape rejection.

## Regression trigger

Any failing case blocks Marketplace release promotion.
