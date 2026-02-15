import { stacksMockData } from '@/data/index';
import type { StackApi } from '@/types/api.stacks';
import { createServer, Model, Factory, RestSerializer, Response } from 'miragejs';
import { getCurrentISODate, generateUniqueId } from '../utils';
import { ErrorType } from '..';

/**
 * 
 * @example example list 
 * stacksMockData > []
 * {
		id: 1,
		title: 'React',
		status: 'Published',
		author: 'Facebook',
		createdAt: '2023-01-01T12:00:00Z'
	},
 */
const apiUri = () => {
	return import.meta.env.VITE_API_URI || process.env.API_URI;
};

export function createMockServer() {
	const size = stacksMockData.length;
	return createServer({
		serializers: {
			application: RestSerializer
		},

		models: {
			stack: Model.extend<Partial<StackApi>>({})
		},

		factories: {
			stack: Factory.extend<StackApi>({
				title: (i: number) => stacksMockData[i].title,
				status: (i: number) => stacksMockData[i].status,
				author: (i: number) => stacksMockData[i].author,
				createdAt() {
					return getCurrentISODate();
				}
			} as any)
		},

		seeds(server) {
			server.createList('stack', size);
		},

		routes() {
			this.namespace = apiUri();

			this.get('/stacks', (schema) => {
				return schema.all('stack');
			});

			this.post('/stack', (schema, request) => {
				const attrs = JSON.parse(request.requestBody) as StackApi;

				const d = {
					...attrs,
					createdAt: getCurrentISODate(),
					id: generateUniqueId()
				} as any;

				return schema.create('stack', d);
			});

			this.patch('/stack/:id', (schema, request) => {
				const { id } = request.params;
				const attrs = JSON.parse(request.requestBody) as Partial<StackApi>;
				const stack = schema.find('stack', id);
				// make sure not manipulation from client
				attrs.createdAt = stack?.createdAt;

				if (stack) {
					const updated = stack.update(attrs);
					return updated;
				} else {
					return new Response(404, {}, { error: ErrorType.STACK_NOT_FOUND });
				}
			});

			this.delete('/stack/:id', (schema, request) => {
				const { id } = request.params;
				const stack = schema.find('stack', id);

				if (stack) {
					stack.destroy();
					return new Response(200, {}, { message: ErrorType.STACK_DELETED, deletedId: id });
				} else {
					return new Response(404, {}, { error: ErrorType.STACK_DELETED });
				}
			});
		}
	});
}
