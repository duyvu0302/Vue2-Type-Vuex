<template>
    <div class="detail">
        <div class="container">
            <div class="row bg-secondary mb-4">
                <div class="col-6">
                    <p>
                        Title
                    </p>
                </div>
                <div class="col-3">
                    Status
                </div>
            </div>
            <div class="row ">
                <div class="col-6">
                    <p>
                        {{ task.title }}
                    </p>
                </div>
                <div class="col-3">
                    {{ task.isCompleted }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { Task } from '@/types';
@Component
export default class Detail extends Vue {
    @Action('getDetail') readonly getDetail!: Function;
    @Getter('task') readonly task!: Task;
    // mounted() {
    //     console.log(this.$route.params.id);
    //     this.getDetail({
    //         id: this.$route.params.id,
    //     });
    //     console.log(this.task);
    // }
    @Watch('$route', { immediate: true })
    handleGetDetail() {
        this.getDetail({
            id: this.$route.params.id,
        });
    }
    // beforeUpdate() {
    //     console.log(this.tasks);
    // },
    // computed: {
    //     ...mapGetters({
    //         tasks: 'tasks',
    //     }),
    // },
    // methods: {
    //     ...mapActions(['getTaskDetails']),
    // },
}
</script>

<style></style>
