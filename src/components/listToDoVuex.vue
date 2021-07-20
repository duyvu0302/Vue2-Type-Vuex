<template>
    <div class="container">
        <!-- <div class="text-center">
            <b-spinner variant="primary" v-if="loading"></b-spinner>
        </div> -->
        <!-- <b-button @click="handleChangeFilter" class="btn btn-primary">
            Filter Task Completed
        </b-button> -->
        <div class="row">
            <div class="col-lg-9">
                <input
                    type="text"
                    class="form-control"
                    v-model="taskContent"
                    placeholder="new task"
                />
            </div>
            <div class="col-lg-3 d-flex justify-content-end pb-5">
                <button
                    @click="handleCreateTask"
                    class="btn btn-outline-primary "
                >
                    Add New Task
                </button>
            </div>
        </div>
        <div class="row">
            <div
                v-for="(item, index) in listTask"
                :key="index"
                :class="[item.isCompleted ? 'active' : '', 'listTask']"
            >
                <div class="listTask__content">
                    <div class="listTask__content-check">
                        <input
                            :checked="item.isCompleted"
                            @change="handleCompleteTask(item)"
                            type="checkbox"
                            name=""
                            :id="`${item.id}`"
                        />
                        <!-- <p v-if="isChecked">{{ isChecked }}</p> -->
                    </div>
                    <div class="listTask__content-title">
                        {{ item.title }}
                    </div>
                </div>
                <div class="listTask__action">
                    <Modal
                        :title="title"
                        @updata="title = $event"
                        :id="item.id"
                        :type="type"
                    />
                    <b-button
                        v-b-modal="`modal-prevent-closing-${item.id}`"
                        class="btn btn-warning"
                        @click="(type = 'modify'), (title = item.title)"
                        >Modify
                    </b-button>
                    <b-button
                        v-b-modal="`modal-prevent-closing-${item.id}`"
                        class="btn btn-danger"
                        @click="type = 'delete'"
                        >Delete</b-button
                    >
                    <b-button class="btn btn-outline-gray">
                        <router-link :to="{ path: `/ListToDo/${item.id}` }">
                            Detail
                        </router-link>
                    </b-button>
                    <b-button @click="addCart(item)">
                        Add To Cart
                    </b-button>
                </div>
            </div>
        </div>
        <b-pagination
            class="pt-5"
            v-model="filter.currentPage"
            :total-rows="50"
            :per-page="filter.perPage"
            first-number
        ></b-pagination>
        <p>
            {{ filter.currentPage }}
        </p>
        <b-button class="btn btn-outline-gray">
            <router-link to="/cart">
                Cart
            </router-link>
        </b-button>
    </div>
</template>

<script lang="ts">
import Modal from './modal.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { Task } from '@/types';

@Component({
    components: {
        Modal,
    },
})
export default class extends Vue {
    taskContent: string = '';
    type: string = '';
    isChecked: string = '';
    loading: boolean = true;
    filter = {
        currentPage: 1,
        perPage: 5,
        completed: null,
    };
    cart!: Task[];
    value: string = '';
    title: string = '';

    @Getter('listTask') listTask!: Task[];
    @Action('getTask') readonly getTask!: Function;
    @Action('createTask') readonly createTask!: Function;
    @Action('editTask') readonly editTask!: Function;

    mounted() {
        const { currentPage, perPage } = this.filter;
        this.getTask({
            page: currentPage,
            limit: perPage,
        }).finally(() => {
            this.loading = false;
        });
        console.log(this.$route);
    }
    handleCreateTask() {
        this.createTask({
            title: this.taskContent,
            isCompleted: false,
            quantity: 1,
        });
    }
    handleCompleteTask(data: Task): void {
        this.editTask({
            title: data.title,
            id: data.id,
            isCompleted: data.isCompleted,
        });
    }
    addCart(data: Task) {
        this.cart = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (this.cart) {
            let indexId = this.cart.findIndex(
                (item: Task) => item.id === data.id
            );
            if (indexId !== -1) {
                this.cart.splice(indexId, 1, {
                    ...data,
                    quantity: this.cart[indexId].quantity! + 1,
                });
            } else {
                this.cart.push(data as never);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(this.cart));
        console.log(this.cart);
    }

    @Watch('filter', { deep: true, immediate: false })
    handleChangePagination(): void {
        const { currentPage, completed } = this.filter;
        this.getTask({ page: currentPage, isCompleted: completed });
    }

    // mounted() {
    //   const { currentPage, perPage } = this.filter;
    //   this.getTask({
    //     page: currentPage,
    //     limit: perPage,
    //   }).finally(() => {
    //     this.loading = false;
    //   });
    // },

    // methods: {
    //   ...mapActions(["getTask", "createTask", "completeTask"]),
    //   handleCreateTask() {
    //     this.taskContent &&
    //       this.createTask({
    //         completed: false,
    //         title: this.taskContent,
    //       });
    //     this.taskContent = "";
    //   },
    //   handleCompleteTask(id, bl, title) {
    //     this.completeTask({
    //       id: id,
    //       completed: bl,
    //       title: title,
    //     });
    //   },
    //   handleChangePagination(value) {
    //     this.filter.currentPage = value;
    //   },
    //   handleChangeFilter() {
    //     this.filter.completed = true;
    //     this.filter.currentPage = 1;
    //   },
    //   addCart(data) {
    //     this.cart = JSON.parse(localStorage.getItem("tasks"));
    //     console.log(this.cart);
    //     if (this.cart) {
    //       let indexId = this.cart.findIndex((item) => item.id === data.id);
    //       if (indexId !== -1) {
    //         this.cart.splice(indexId, 1, {
    //           ...data,
    //           count: this.cart[indexId].count + 1,
    //         });
    //       } else {
    //         this.cart.push(data);
    //       }
    //       localStorage.setItem("tasks", JSON.stringify(this.cart));
    //     } else {
    //       localStorage.setItem("tasks", JSON.stringify([data]));
    //     }
    //   },
    //   changValue(value, id) {
    //     this.cart = JSON.parse(localStorage.getItem("tasks"));
    //     let indexId = this.cart.findIndex((item) => item.id === id);
    //     let tasksInner = this.cart.find((item) => item.id === id);
    //     if (indexId !== -1) {
    //       this.cart.splice(indexId, 1, {
    //         ...tasksInner,
    //         count: parseInt(value),
    //       });
    //       localStorage.setItem("tasks", JSON.stringify(this.cart));
    //     }
    //     console.log(tasksInner.count);
    //   }

    // },
    // watch: {
    //   filter: {
    //     deep: true,
    //     handler: function() {
    //       const { currentPage, perPage, completed } = this.filter;
    //       this.getTask({
    //         page: currentPage,
    //         limit: perPage,
    //         completed,
    //       });
    //     },
    //   },
    // },
}
</script>

<style lang="scss">
a {
    text-decoration: none;
}
.listTask {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    cursor: pointer;
    &.active {
        background: gray;
    }
    &__content {
        @extend .listTask;
    }

    &__action {
        display: flex;
        background: white !important;
        gap: 1rem;
        padding: 0.2rem 0;
        margin-right: -12px;
    }
}
</style>
