export type StackApiStatus = 'Draft' | 'Published';
export interface StackApi {
	id: number | string;
	title: string;
	status: StackStatus;
	author: string;
	createdAt: string;
}
