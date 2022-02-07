import { lstat, access, readlink, readdir } from 'fs/promises';
import { parse, join, resolve, dirname } from 'path';
import { constants } from 'fs';
import { TreeElement } from './tree-element';

/**
 * Builds an object representation of the file tree, starting at the passed `path`.
 *
 * @param path The path to the root of the tree
 * @returns an object representation of the `path` and all its children
 *
 * @example ```js
 * const dirTree = require('@fliegwerk/dir-tree');
 * const { join } = require('path');
 *
 * const tree = await dirTree(
 *   join(__dirname, 'template')
 * );
 * ```
 */
export async function dirTree(path: string): Promise<TreeElement> {
	path = resolve(process.cwd(), path);
	const { base: name, ext } = parse(path);

	try {
		await access(path, constants.F_OK | constants.R_OK);
		const stats = await lstat(path);

		if (stats.isFile()) {
			return { type: 'file', path, name, ext };
		} else if (stats.isSymbolicLink()) {
			const destination = resolve(dirname(path), await readlink(path));
			return { type: 'link', path, name, ext, destination };
		} else if (stats.isDirectory()) {
			const childrenPaths = await readdir(path);
			const children = await Promise.all(
				childrenPaths.map(childPath => join(path, childPath)).map(dirTree)
			);
			return { type: 'directory', path, name, ext, children };
		} else {
			const error = new Error('Unsupported file type.');
			return { type: 'unreadable', path, name, ext, error };
		}
	} catch (error) {
		return { type: 'unreadable', path, name, ext, error };
	}
}
