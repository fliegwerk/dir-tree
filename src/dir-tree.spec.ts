import { dirTree } from './dir-tree';
import { join } from 'path';

it('should successfully parse the .github directory', async () => {
	const result = await dirTree(join(__dirname, '..', '.github'));
	expect(result).toMatchObject({
		type: 'directory'
	});
});
