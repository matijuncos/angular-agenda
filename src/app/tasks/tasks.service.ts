import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	constructor(private http: HttpClient) {}

	getTasks() {
		return this.http.get(
			'https://organizateunpoco.herokuapp.com/api/tasks'
		);
	}

	postTask(task: any) {
		return this.http.post(
			`https://organizateunpoco.herokuapp.com/api/tasks`,
			task
		);
	}

	deleteTask(id: any) {
		return this.http.delete(
			'https://organizateunpoco.herokuapp.com/api/task/' + id
		);
	}
	taskstatus(id) {
		return this.http.post(
			'https://organizateunpoco.herokuapp.com/api/task/' + id,
			id
		);
	}
}
