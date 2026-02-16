import { stacksMockData } from '../../data';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	stacksMockData.forEach((n) => {
		n.id = n.id.toString() as any;
	});
	return {
		// we cannot use mock server here as miragejs only works client side
		stacks: stacksMockData
	};
};
