const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

test.beforeEach(async ({ page }) => {
  // The guestbook is public API-backed, but tests must be deterministic and not depend on network.
  await page.route('https://api.github.com/**', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.goto('/');
});

test('loads the portal and eight real project cards', async ({ page }) => {
  await expect(page).toHaveTitle(/ALI\.OS/);
  await expect(page.getByRole('heading', { name: 'Explore my builds' })).toBeVisible();
  await expect(page.locator('.project-card')).toHaveCount(8);
  await expect(page.locator('#music-title')).toHaveText('Not connected');
  const screenshots = 'screenshots';
  fs.mkdirSync(screenshots, { recursive: true });
  await page.screenshot({ path: screenshots + '/' + test.info().project.name + '-full-page.png', fullPage: true, animations: 'disabled' });
});

test('filters projects by category, search and constellation planet', async ({ page }) => {
  await page.locator('#project-category').selectOption('game');
  await expect(page.locator('.project-card')).toHaveCount(2);
  await page.locator('#project-category').selectOption('all');
  await page.getByRole('searchbox', { name: 'Search projects' }).fill('LexiLoop');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h3')).toHaveText('LexiLoop');
  await page.getByRole('searchbox', { name: 'Search projects' }).clear();
  await page.getByRole('button', { name: 'View Pockit project' }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  await expect(page.locator('.project-card h3')).toHaveText('Pockit');
});

test('answers curated project questions without an AI account', async ({ page }) => {
  await page.locator('#chat-question').fill('What is Pockit?');
  await page.getByRole('button', { name: 'Send question' }).click();
  await expect(page.locator('.chat-log .bubble.bot').last()).toContainText('Pockit');
  await expect(page.locator('.chat-log .bubble.bot').last().getByRole('link', { name: /Pockit/ })).toHaveAttribute('href', /github\.com\/alinikan\/pockit/);
});

test('changes themes without reloading', async ({ page }) => {
  await page.getByRole('button', { name: /ARCADE/ }).last().click();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'arcade');
  await page.getByRole('button', { name: /NEBULA/ }).last().click();
  await expect(page.locator('body')).toHaveAttribute('data-theme', 'nebula');
});

test('starts, pauses and resumes the original Starfall mini-game', async ({ page }) => {
  await page.locator('#start-game').click();
  await expect(page.locator('#pause-game')).toBeEnabled();
  await page.locator('#pause-game').click();
  await expect(page.locator('#game-status')).toContainText('paused');
  await page.locator('#pause-game').click();
  await expect(page.locator('#game-status')).toContainText('resumed');
});

test('mobile navigation and layout stay usable', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile-chromium', 'mobile-only assertion');
  const toggle = page.locator('#menu-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.locator('#main-nav').getByRole('link', { name: 'ARCADE' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
});
