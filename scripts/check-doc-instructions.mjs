import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const claudePath = resolve(root, 'CLAUDE.md');

const expectedClaude = `# CLAUDE.md

Repository guidance lives in \`AGENTS.md\`.

This file should remain a minimal redirect so repository instructions have a single source of truth and do not diverge.
`;

const actualClaude = readFileSync(claudePath, 'utf8');

if (actualClaude !== expectedClaude) {
	console.error(
		'CLAUDE.md has drifted. Keep repository guidance in AGENTS.md and restore CLAUDE.md to the canonical redirect.'
	);
	process.exit(1);
}

console.log('Instruction docs check passed.');
