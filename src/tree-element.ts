interface BaseElement {
	type: 'file' | 'directory' | 'link' | 'unreadable';
	path: string;
	ext: string;
	name: string;
}

export interface FileElement extends BaseElement {
	type: 'file';
}

export interface DirectoryElement extends BaseElement {
	type: 'directory';
	children: TreeElement[];
}

export interface LinkElement extends BaseElement {
	type: 'link';
	destination: string;
}

export interface UnreadableElement extends BaseElement {
	type: 'unreadable';
	error: unknown;
}

export type TreeElement =
	| FileElement
	| DirectoryElement
	| LinkElement
	| UnreadableElement;
