<template>
  <div class="model-action">
    <b-modal
      :id="`modal-prevent-closing-${id}`"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      v-if="type === 'modify'"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name" label-for="name-input">
          <b-form-input
            id="name-input"
            :value="title"
            @change="$emit('updata', $event)"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      :id="`modal-prevent-closing-${id}`"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleDelete"
      v-else
    >
      <form ref="form" @submit.prevent="handleSubmit">
        <b-form-group
          :label="`do you want delete ${title} ?`"
          label-for="name-input"
        >
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component
export default class Modal extends Vue {
  @Prop(String) readonly type!: string;
  @Prop(Number) readonly id!: number;
  @Prop(String) title!: string;

  @Getter("listTask") listTask!: any[];
  @Action("editTask") readonly editTask!: Function;
  @Action("deleteTask") readonly deleteTask!: Function;

  handleDelete() {
    this.deleteTask({ id: this.id });
  }
  handleOk() {
    this.editTask({ id: this.id, title: this.title });
  }
  resetModal() {}
  handleSubmit() {
    // this.editTask({
    //   id: this.id,
    //   title: this.title,
    // });
    // Hide the modal manually
    this.$nextTick(() => {
      this.$bvModal.hide(`modal-prevent-closing-${this.id}`);
    });
  }
}
</script>

<style lang="scss">
.modal-action {
}
</style>
