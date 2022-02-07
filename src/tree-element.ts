interface BaseElement {
	/**
	 * The node type
	 */
	type: 'file' | 'directory' | 'link' | 'unreadable';
	/**
	 * The full (absolute) path to the node
	 *
	 * @example `'/home/peter/file.txt'`
	 */
	path: string;
	/**
	 * The {@link name}'s extension including the period. `''` if no extension exists on the {@link name}.
	 *
	 * @example `'.txt'`
	 */
	ext: string;
	/**
	 * The node's full file name, including the extension
	 *
	 * @example `'file.txt'`
	 */
	name: string;
}

/**
 * A node representing a single file
 */
export interface FileElement extends BaseElement {
	type: 'file';
}

/**
 * A node representing a directory
 */
export interface DirectoryElement extends BaseElement {
	type: 'directory';
	/**
	 * The directory's children (child nodes)
	 */
	children: TreeElement[];
}

/**
 * A node representing a symlink
 */
export interface LinkElement extends BaseElement {
	type: 'link';
	/**
	 * The link's target / destination path
	 */
	destination: string;
}

/**
 * A node that cannot be read (e.g., because of insufficient permissions)
 */
export interface UnreadableElement extends BaseElement {
	type: 'unreadable';
	/**
	 * The error that got thrown while trying to read the node
	 */
	error: unknown;
}

/**
 * An element representing a node in a file tree
 *
 * @see FileElement
 * @see DirectoryElement
 * @see LinkElement
 * @see UnreadableElement
 */
export type TreeElement =
	| FileElement
	| DirectoryElement
	| LinkElement
	| UnreadableElement;
