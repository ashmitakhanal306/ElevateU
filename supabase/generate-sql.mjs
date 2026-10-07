/**
 * generate-sql.mjs
 * 
 * Reads all *.seed.json files and generates INSERT SQL for Supabase SQL editor.
 * Only generates SQL for slugs NOT already in the database (the 5 original ones).
 * 
 * Run with:  node supabase/generate-sql.mjs
 * Then paste the output into your Supabase SQL editor.
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Already seeded — skip these
const ALREADY_SEEDED = new Set(['android', 'devops', 'full-stack', 'ux-design', 'product-manager']);

const CATEGORY_MAP = {
  'frontend':           'Engineering',
  'backend':            'Engineering',
  'devsecops':          'Engineering',
  'ios':                'Engineering',
  'postgresql':         'Engineering',
  'blockchain':         'Engineering',
  'qa':                 'Engineering',
  'software-architect': 'Engineering',
  'game-developer':     'Engineering',
  'data-analyst':       'Data & AI',
  'ai-engineer':        'Data & AI',
  'ai-data-scientist':  'Data & AI',
  'data-engineer':      'Data & AI',
  'machine-learning':   'Data & AI',
  'mlops':              'Data & AI',
  'bi-analyst':         'Data & AI',
  'engineering-manager':'Management',
  'developer-relations':'Management',
};

function esc(s) {
  return (s || '').replace(/'/g, "''");
}

const lines = [
  '-- ============================================================',
  '-- ElevateU — Extended Roadmaps Seed (roadmap.sh categories)',
  '-- Paste into Supabase SQL Editor and run',
  '-- ============================================================',
  '',
];

const seedsDir = join(__dirname, 'seeds');
const files = readdirSync(seedsDir)
  .filter(f => f.endsWith('.seed.json'))
  .map(f => join(seedsDir, f));

for (const file of files) {
  const raw  = readFileSync(file, 'utf8');
  const data = JSON.parse(raw);
  const slug = data.slug;

  if (ALREADY_SEEDED.has(slug)) continue;

  const title    = data.title;
  const category = data.category || CATEGORY_MAP[slug] || 'Engineering';
  const roadmapId = randomUUID();

  lines.push(`-- ── ${title} ─────────────────────────────────────────────`);
  lines.push(`insert into roadmaps (id, slug, title, category)`);
  lines.push(`  values ('${roadmapId}', '${esc(slug)}', '${esc(title)}', '${esc(category)}');`);
  lines.push('');

  const topics = data.topics || [];
  for (const topic of topics) {
    const topicId = randomUUID();
    lines.push(`insert into roadmap_topics (id, roadmap_id, title, order_index)`);
    lines.push(`  values ('${topicId}', '${roadmapId}', '${esc(topic.title)}', ${topic.order_index});`);

    for (const sub of (topic.subtopics || [])) {
      const subId = randomUUID();
      const resUrl  = sub.resource_url  ? `'${esc(sub.resource_url)}'`  : 'NULL';
      const resType = sub.resource_type ? `'${esc(sub.resource_type)}'` : 'NULL';
      lines.push(`insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)`);
      lines.push(`  values ('${subId}', '${topicId}', '${esc(sub.title)}', ${resUrl}, ${resType}, ${sub.order_index});`);
    }
    lines.push('');
  }
}

const sql = lines.join('\n');
const outPath = join(__dirname, 'elevateu_extended_roadmaps.sql');
writeFileSync(outPath, sql, 'utf8');
console.log(`✅  SQL written to: ${outPath}`);
console.log(`    Paste it into your Supabase SQL Editor and click Run.`);
