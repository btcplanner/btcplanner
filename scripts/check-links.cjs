#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '..', 'src', 'blogPosts.js');
const SITE_URL = 'https://btcplanner.ca';

const KNOWN_SLUGS = [];
const EXTERNAL_URLS = new Set();
const INTERNAL_PATHS = new Set();
const issues = [];

function extractUrls(text) {
  const urlRegex = /\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  const internalRegex = /\[([^\]]*)\]\((\/[^)]+)\)/g;
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    EXTERNAL_URLS.add(match[2]);
  }
  while ((match = internalRegex.exec(text)) !== null) {
    INTERNAL_PATHS.add(match[2]);
  }
}

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'BTCPlanner-LinkChecker/1.0' },
      redirect: 'follow',
    });
    clearTimeout(timeout);
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

async function main() {
  console.log('BTCPlanner Link Checker\n');

  const content = fs.readFileSync(BLOG_POSTS_PATH, 'utf-8');

  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    KNOWN_SLUGS.push(match[1]);
  }

  extractUrls(content);

  console.log(`Found ${KNOWN_SLUGS.length} blog posts`);
  console.log(`Found ${EXTERNAL_URLS.size} external URLs`);
  console.log(`Found ${INTERNAL_PATHS.size} internal links\n`);

  // Check internal links
  console.log('--- Internal Links ---');
  for (const p of INTERNAL_PATHS) {
    if (p.startsWith('/blog/')) {
      const slug = p.replace('/blog/', '');
      if (!KNOWN_SLUGS.includes(slug)) {
        issues.push(`BROKEN internal link: ${p} (slug "${slug}" not found)`);
        console.log(`  BROKEN: ${p}`);
      } else {
        console.log(`  OK: ${p}`);
      }
    } else {
      console.log(`  OK (page): ${p}`);
    }
  }

  // Check external links
  console.log('\n--- External Links ---');
  const results = [];
  const urls = [...EXTERNAL_URLS];

  // Check in batches of 3 to avoid overwhelming
  for (let i = 0; i < urls.length; i += 3) {
    const batch = urls.slice(i, i + 3);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  for (const r of results) {
    if (r.ok) {
      console.log(`  OK (${r.status}): ${r.url}`);
    } else {
      const reason = r.error || `HTTP ${r.status}`;
      issues.push(`BROKEN external link: ${r.url} (${reason})`);
      console.log(`  BROKEN (${reason}): ${r.url}`);
    }
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Total links checked: ${INTERNAL_PATHS.size + EXTERNAL_URLS.size}`);
  console.log(`Issues found: ${issues.length}`);

  if (issues.length > 0) {
    console.log('\nIssues:');
    issues.forEach(i => console.log(`  - ${i}`));
    process.exit(1);
  } else {
    console.log('\nAll links OK!');
  }
}

main().catch(err => {
  console.error('Link checker failed:', err);
  process.exit(1);
});
