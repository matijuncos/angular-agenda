import { Action, State } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../interfaces/task.interface';

import { TaskToDone, deleteTask, addTask, getAllTasks } from './task.actions';

const INIT_STATE: Task[] = [];

const _taskReducer = createReducer(
	INIT_STATE,
	on(getAllTasks, (state, action) => (state = action.tasks)),
	on(addTask, (state, action) => state.concat(action.task)),
	on(deleteTask, (state, action) =>
		state.filter((task) => task._id !== action.id)
	),
	on(
		TaskToDone,
		(state, action) =>
			(state = state.map((task) =>
				task._id === action.task._id ? action.task : task
			))
	)
);

export function tasksReducer(state: Task[] | undefined, action: Action) {
	return _taskReducer(state, action);
}
