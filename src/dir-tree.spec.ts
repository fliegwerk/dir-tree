import { dirTree } from './dir-tree';
import { resolve } from 'path';
import mockFS from 'mock-fs';
import {
	DirectoryElement,
	LinkElement,
	UnreadableElement
} from './tree-element';

beforeEach(() => {
	mockFS({
		'/flat': {
			'a.ts': 'Hello world',
			'b.ts': 'Another file'
		},
		'/not-so-flat': {
			a: {
				'a.ts': 'Hello world',
				'b.ts': 'Another file'
			},
			b: {
				'a.ts': 'Hello world',
				'b.ts': 'Another file'
			},
			c: {
				'a.ts': 'Hello world',
				'b.ts': 'Another file'
			}
		},
		'/link': mockFS.symlink({
			path: '/flat'
		})
	});
});

afterEach(() => {
	mockFS.restore();
});

it('should successfully parse a flat directory', async () => {
	const result = await dirTree('/flat');

	expect(result).toMatchObject<DirectoryElement>({
		type: 'directory',
		name: 'flat',
		ext: '',
		path: resolve('/flat'),
		children: [
			{
				type: 'file',
				name: 'a.ts',
				ext: '.ts',
				path: resolve('/flat/a.ts')
			},
			{
				type: 'file',
				name: 'b.ts',
				ext: '.ts',
				path: resolve('/flat/b.ts')
			}
		]
	});
});

it('should successfully parse a deep directory', async () => {
	const result = await dirTree('/not-so-flat');
	expect(result).toMatchObject<Partial<DirectoryElement>>({
		type: 'directory',
		name: 'not-so-flat',
		ext: '',
		path: resolve('/not-so-flat')
	});
	expect(result).toHaveProperty('children');
	if (result.type === 'directory') {
		expect(result.children.length).toBe(3);
	}
});

it('should successfully parse a symlink', async () => {
	const result = await dirTree('/link');
	expect(result).toMatchObject<LinkElement>({
		type: 'link',
		name: 'link',
		ext: '',
		path: resolve('/link'),
		destination: resolve('/flat')
	});
});

it('should fail return an UnreadableElement for non-existent files', async () => {
	const result = await dirTree('/non-existent');
	expect(result).toMatchObject<UnreadableElement>({
		type: 'unreadable',
		path: resolve('/non-existent'),
		name: 'non-existent',
		ext: '',
		error: {
			code: 'ENOENT'
		}
	});
});
