import { ActionTree, MutationTree, ActionContext } from 'vuex';
import * as types from '@/store/mutation-types';
import { RootState, UserState } from '@/store/state';
import { User } from '@/types';
import axios from 'axios';

type UserContext = ActionContext<UserState, RootState>;
const baseUrl = 'http://localhost:3000/listUser';

const state: UserState = {
    user: {
        email: '',
        password: '',
    },
    isAuth: false,
};

const getters = {
    isAuth: (state: UserState) => state.isAuth,
};
const actions: ActionTree<UserState, RootState> = {
    async createAccount({ commit }: UserContext, params: any) {
        const { email, id } = params;
        try {
            const response = await axios.get(`${baseUrl}?email=${email}`);
            if (response.data.length > 0) {
                console.log('error');
            } else {
                const res = await axios.post(`${baseUrl}/listUser`, params);
                commit(types.CREATE_ACCOUNT, res.data);
                localStorage.setItem(
                    'user',
                    JSON.stringify({ ...res.data, role: 'user' })
                );
            }
        } catch (error) {
            console.log(error);
        }
    },
    async login({ commit }: UserContext, params: any) {
        const { email, password } = params;
        try {
            const response = await axios.get(
                `${baseUrl}?email=${email}&password=${password}`
            );

            if (response.data.length === 0) {
                commit(types.LOGIN_FAI, []);
                console.log('error');
            } else {
                commit(types.LOGIN, response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
        } catch (error) {
            console.log(error);
            commit(types.LOGIN_FAI, []);
        }
    },
};

const mutations: MutationTree<UserState> = {
    [types.CREATE_ACCOUNT](state: UserState, user: User) {
        state.user = user;
    },
    [types.LOGIN](state: UserState, user: User) {
        state.isAuth = true;
        state.user = user;
    },
    [types.LOGIN_FAI](state: UserState, user: User) {
        state.isAuth = false;
        state.user = user;
    },
};
export const user = {
    state,
    getters,
    mutations,
    actions,
};
