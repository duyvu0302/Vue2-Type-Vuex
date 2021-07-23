import { ActionContext, ActionTree, MutationTree } from 'vuex';
import * as types from '@/store/mutation-types';
import { RootState, TaskState } from '@/store/state';
import { Task } from '@/types';
import axios from 'axios';

type TaskContext = ActionContext<TaskState, RootState>;
const baseUrl = 'http://localhost:3000';

const state: TaskState = {
    listTask: [],
    task: {
        title: '',
        quantity: 1,
        isCompleted: false,
    },
};
const getters = {
    task: (state: TaskState) => state.task,
    listTask: (state: TaskState) => state.listTask,
};

const actions: ActionTree<TaskState, RootState> = {
    async getTask({ commit }: TaskContext, params: any) {
        const { page, isCompleted } = params;
        try {
            const response = await axios({
                url: `${baseUrl}/tasks`,
                method: 'GET',
                params: {
                    ...(page && { _page: page }),
                    _limit: 10,
                    ...(isCompleted && { isCompleted: isCompleted }),
                },
            });

            commit(types.GET_TASK_LIST, response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async createTask({ commit }: TaskContext, params: Task) {
        try {
            const response = await axios.post(`${baseUrl}/tasks`, params);
            commit(types.CREATE_TASK, response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async editTask({ commit }: TaskContext, params: Task) {
        const { id, title, isCompleted } = params;
        try {
            const response = await axios.patch(`${baseUrl}/tasks/${id}`, {
                title: title,
                isCompleted: !isCompleted,
            });
            commit(types.EDIT_TASK, response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async deleteTask({ commit }: TaskContext, params: Task) {
        const { id } = params;
        try {
            await axios.delete(`${baseUrl}/tasks/${id}`);
            commit(types.DELETE_TASK, id);
        } catch (error) {
            console.log(error);
        }
    },
    async getDetail({ commit }: TaskContext, params: Task) {
        const { id } = params;
        try {
            const response = await axios.get(`${baseUrl}/tasks/${id}`);
            commit(types.GET_DETAIL, response.data);
        } catch (error) {
            console.log(error);
        }
    },
};
const mutations: MutationTree<TaskState> = {
    [types.GET_TASK_LIST](state: TaskState, list: Task[]) {
        state.listTask = list;
    },
    [types.CREATE_TASK](state: TaskState, taskInner: Task) {
        state.listTask.unshift(taskInner);
    },
    [types.EDIT_TASK](state: TaskState, taskInner: Task) {
        const indexId = state.listTask.findIndex(
            (item) => item.id === taskInner.id
        );
        state.listTask.splice(indexId, 1, taskInner);
    },
    [types.DELETE_TASK](state: TaskState, idTask: Task) {
        const indexId = state.listTask.findIndex((item) => item.id === idTask);
        state.listTask.splice(indexId, 1);
    },
    [types.GET_DETAIL](state: TaskState, task: Task) {
        console.log('🚀 ~ file: task.ts ~ line 99 ~ task', task);
        state.task = task;
    },
};
export const task = {
    state,
    getters,
    mutations,
    actions,
};
