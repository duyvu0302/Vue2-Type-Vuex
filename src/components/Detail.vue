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
            {{ tasks.title }}
          </p>
        </div>
        <div class="col-3">
          {{ tasks.completed }}
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Detail",
  mounted() {
    console.log(this.$route.params.id);
    this.getTaskDetails({
      id: this.$route.params.id,
    });
  },
  beforeUpdate() {
    console.log(this.tasks);
  },
  computed: {
    ...mapGetters({
      tasks: "tasks",
    }),
  },
  methods: {
    ...mapActions(["getTaskDetails"]),
  },
};
</script>

<style></style>
