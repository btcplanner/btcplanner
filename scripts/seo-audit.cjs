#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '..', 'src', 'blogPosts.js');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const INDEX_PATH = path.join(__dirname, '..', 'index.html');

const issues = [];
const suggestions = [];

function warn(msg) { issues.push(msg); }
function suggest(msg) { suggestions.push(msg); }

function main() {
  console.log('BTCPlanner SEO Audit\n');

  const blogContent = fs.readFileSync(BLOG_POSTS_PATH, 'utf-8');
  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const indexHtml = fs.readFileSync(INDEX_PATH, 'utf-8');

  // Extract blog post data
  const slugs = [...blogContent.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  const titles = [...blogContent.matchAll(/en:\s*"([^"]+)"/g)];
  const descriptions = [...blogContent.matchAll(/en:\s*"([^"]+)"/g)];
  const dates = [...blogContent.matchAll(/date:\s*"([^"]+)"/g)].map(m => m[1]);

  console.log(`Blog posts: ${slugs.length}`);
  console.log(`Post dates: ${dates.join(', ')}\n`);

  // Check sitemap has all blog posts
  console.log('--- Sitemap Check ---');
  for (const slug of slugs) {
    const url = `https://btcplanner.ca/blog/${slug}`;
    if (sitemap.includes(url)) {
      console.log(`  OK: ${slug}`);
    } else {
      warn(`Missing from sitemap: ${url}`);
      console.log(`  MISSING: ${slug}`);
    }
  }

  // Check index.html has essential SEO tags
  console.log('\n--- Index HTML Check ---');
  const requiredMeta = [
    'og:title', 'og:description', 'og:image', 'og:url',
    'twitter:card', 'twitter:title',
    'description', 'canonical',
  ];
  for (const tag of requiredMeta) {
    if (indexHtml.includes(tag)) {
      console.log(`  OK: ${tag}`);
    } else {
      warn(`Missing meta tag: ${tag}`);
      console.log(`  MISSING: ${tag}`);
    }
  }

  // Check for structured data
  console.log('\n--- Structured Data Check ---');
  if (indexHtml.includes('application/ld+json')) {
    console.log('  OK: JSON-LD found');
    if (indexHtml.includes('"WebSite"')) console.log('  OK: WebSite schema');
    if (indexHtml.includes('"FAQPage"')) console.log('  OK: FAQPage schema');
  } else {
    warn('No JSON-LD structured data in index.html');
  }

  // Content freshness check
  console.log('\n--- Content Freshness ---');
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);
  let freshCount = 0;
  let staleCount = 0;

  for (const date of dates) {
    const postDate = new Date(date + 'T00:00:00');
    if (postDate > thirtyDaysAgo) {
      freshCount++;
    } else if (postDate < ninetyDaysAgo) {
      staleCount++;
      suggest(`Stale content (>90 days): post dated ${date} — consider updating`);
    }
  }
  console.log(`  Fresh (<30d): ${freshCount}`);
  console.log(`  Aging (30-90d): ${dates.length - freshCount - staleCount}`);
  console.log(`  Stale (>90d): ${staleCount}`);

  // Title length checks
  console.log('\n--- Title Length Check ---');
  const titleRegex = /title:\s*\{\s*en:\s*"([^"]+)"/g;
  let titleMatch;
  while ((titleMatch = titleRegex.exec(blogContent)) !== null) {
    const title = titleMatch[1];
    const fullTitle = `${title} | BTC Planner`;
    if (fullTitle.length > 60) {
      suggest(`Title may be truncated in search results (${fullTitle.length} chars): "${fullTitle}"`);
      console.log(`  LONG (${fullTitle.length}): ${title}`);
    } else {
      console.log(`  OK (${fullTitle.length}): ${title}`);
    }
  }

  // Description length checks
  console.log('\n--- Description Length Check ---');
  const descRegex = /description:\s*\{\s*en:\s*"([^"]+)"/g;
  let descMatch;
  while ((descMatch = descRegex.exec(blogContent)) !== null) {
    const desc = descMatch[1];
    if (desc.length > 160) {
      suggest(`Description may be truncated (${desc.length} chars): "${desc.slice(0, 60)}..."`);
      console.log(`  LONG (${desc.length}): ${desc.slice(0, 50)}...`);
    } else if (desc.length < 120) {
      suggest(`Description could be longer for better CTR (${desc.length} chars): "${desc.slice(0, 60)}..."`);
      console.log(`  SHORT (${desc.length}): ${desc.slice(0, 50)}...`);
    } else {
      console.log(`  OK (${desc.length}): ${desc.slice(0, 50)}...`);
    }
  }

  // Keyword gap suggestions
  console.log('\n--- Keyword Gap Suggestions ---');
  const targetKeywords = [
    'bitcoin fhsa canada', 'bitcoin rrsp', 'bitcoin tfsa',
    'best bitcoin exchange canada', 'bitcoin mining canada',
    'bitcoin regulation canada', 'bitcoin estate planning canada',
    'bitcoin gift tax canada', 'bitcoin for beginners canada',
    'shakepay vs newton', 'kraken vs coinbase canada',
  ];
  for (const kw of targetKeywords) {
    const found = blogContent.toLowerCase().includes(kw.replace(/ /g, '').toLowerCase()) ||
      blogContent.toLowerCase().includes(kw);
    if (!found) {
      suggest(`Content gap: no post targeting "${kw}"`);
      console.log(`  GAP: ${kw}`);
    } else {
      console.log(`  COVERED: ${kw}`);
    }
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Issues: ${issues.length}`);
  console.log(`Suggestions: ${suggestions.length}`);

  if (issues.length > 0) {
    console.log('\nIssues:');
    issues.forEach(i => console.log(`  - ${i}`));
  }
  if (suggestions.length > 0) {
    console.log('\nSuggestions:');
    suggestions.forEach(s => console.log(`  - ${s}`));
  }
}

main();
