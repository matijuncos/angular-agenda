export interface Task {
	_id: string;
	title: string;
	description: string;
	date: Date;
	hour: number;
	userId: any;
}

export interface NewTask {
	title: string;
	description: string;
	date: Date;
	hour: number;
}
