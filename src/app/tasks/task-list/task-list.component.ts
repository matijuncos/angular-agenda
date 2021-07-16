import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { TasksService } from '../tasks.service';
import { Store, select } from '@ngrx/store';
import { deleteTask, TaskToDone, getAllTasks } from '../task.actions';
import { Task } from 'src/app/interfaces/task.interface';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
	tasks: any = [];
	$tasks: Observable<Task[]>;
	loading: boolean = false;
	constructor(
		private store: Store<{ tasks: Task[] }>,
		private taskService: TasksService,
		private authService: AuthService,
		private _snackBar: MatSnackBar
	) {
		store.select('tasks').subscribe((taskState) => {
			this.tasks = taskState;
		});
		this.authService.loginStatus.subscribe((res) => {
			this.loading = true;
			if (res) {
				this.taskService
					.getTasks()
					.pipe(map((res: any) => res.response))
					.subscribe((data: Task[]) => {
						const userTasks = data.filter(
							(task) =>
								task.userId._id ===
								this.authService.loggedUser._id
						);
						this.store.dispatch(getAllTasks({ tasks: userTasks }));
						this.loading = false;
					});
			}
		});
	}

	deleteTask(id: string) {
		this.taskService.deleteTask(id).subscribe((task: Task) => {
			if (task) {
				this.store.dispatch(deleteTask({ id }));
				this._snackBar.open('Eliminaste tu tarea!', 'Ok', {
					duration: 1500,
				});
			}
		});
	}
	taskToDone(id: string) {
		this.taskService
			.taskstatus(id)
			.pipe(map((res: any) => res.response))
			.subscribe((data: Task) => {
				this.store.dispatch(TaskToDone({ task: data }));
				this._snackBar.open('Buen trabajo! Tarea completada!', 'Ok', {
					duration: 1500,
				});
			});
	}
}
