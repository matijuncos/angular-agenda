import { createAction, props } from '@ngrx/store';
import { Task } from '../interfaces/task.interface';

export const getAllTasks = createAction(
	'[Task], Get tasks',
	props<{ tasks: Task[] }>()
);
export const addTask = createAction(
	'[Task], Add Task',
	props<{ task: Task }>()
);
export const TaskToDone = createAction(
	'[Task] Task To Done',
	props<{ task: Task }>()
);
export const deleteTask = createAction(
	'[Task] Delete Task',
	props<{ id: string }>()
);
