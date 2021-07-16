import { Component } from '@angular/core';
import { NewTask, Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { TasksService } from '../tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addTask } from '../task.actions';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss'],
})
export class FormComponent {
	formData: any = {
		title: '',
		description: '',
		date: '',
		time: '',
	}; //definir interfaz de datos de task

	constructor(
		private taskService: TasksService,
		private authService: AuthService,
		private _snackBar: MatSnackBar,
		private store: Store<Task[]>
	) {}

	addTask() {
		//usamos esta funcion para recibir los datos del formulario y accionar la creacion de la tarea al backend
		// ejecutamos la creacion de la tarea con los datos en la variable

		this.taskService
			.postTask({
				task: this.formData,
				userId: this.authService.loggedUser._id,
			})
			.subscribe((res: any) => {
				if (res.success) {
					this.store.dispatch(addTask({ task: res.response }));
					this._snackBar.open('Tarea agregada con éxito', 'Ok', {
						duration: 1500,
					});
				}
			});
	}
}
