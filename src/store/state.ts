import { Task, User } from '@/types';

export interface ModuleState {}
export interface UserState extends ModuleState {
    user: User;
    isAuth: boolean;
}
export interface TaskState extends ModuleState {
    listTask: Task[];
    task: Task;
}
export interface RootState {
    task: TaskState;
    user: UserState;
}
