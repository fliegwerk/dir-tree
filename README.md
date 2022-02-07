# `@fliegwerk/dir-tree`

![NPM](https://img.shields.io/npm/l/@fliegwerk/dir-tree)
![npm (scoped)](https://img.shields.io/npm/v/@fliegwerk/dir-tree)
![node-current (scoped)](https://img.shields.io/node/v/@fliegwerk/dir-tree)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@fliegwerk/dir-tree)
![GitHub Repo stars](https://img.shields.io/github/stars/fliegwerk/dir-tree?style=social)

Recursively parses a directory and returns the content as an object

## Installation

```shell
npm install @fliegwerk/dir-tree
```

or

```shell
yarn add @fliegwerk/dir-tree
```

## Usage

```js
const dirTree = require('@fliegwerk/dir-tree');
const {join} = require('path');

const tree = await dirTree(
    join(__dirname, 'template')
);

console.log(tree.type); // 'file' | 'directory' | 'link' | 'unreadable'
console.log(tree);
```

`dirTree(path)` returns a `Promise` that resolves to a `TreeElement` object.

A `TreeElement` object can be one of four types:

- `FileElement` (`element.type === 'file'`) - a simple file in the file system
- `DirectoryElement` (`element.type === 'directory'`) - a directory containing `children: TreeElement[]`
- `LinkElement` (`element.type === 'link'`) - a type representing a symlink in the file system. Contains
  a `destination: string` that is the link's destination path
- `UnreadableElement` (`element.type === 'unreadable'`) - a type representing an unreadable file in the file system.
  Contains an `error: unknown` that is the error that got thrown while trying to read the file.

Apart from these additional properties, all `TreeElement` objects have the following properties:

- `type: 'file' | 'directory' | 'link' | 'unreadable'` - the element type
- `path: string` - the full, absolute path to the element
- `ext: string` - the file name extension (including the period), if it exists. Empty string (`''`) if no file extension
  exists.
- `name: string` - the name of the file (including the extension)

## Additional options

No additional options exist in this library. We want to focus on doing one job well (and rock-solid). That's why we don'
t provide a lot of options around our core functionality.
