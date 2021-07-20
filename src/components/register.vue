<template>
  <div class="payment">
    <div class="container">
      <b-row align-h="center">
        <b-col cols="8">
          <ValidationObserver v-slot="{ handleSubmit }" ref="observer">
            <b-form @submit.prevent="handleSubmit(onSubmit)">
              <CustomInput
                rules="required"
                name="Name"
                resLabel="3"
                resContent="7"
                label="Name"
                :value="user.name"
                @input="user.name = $event"
                placeholder="Enter name"
              />
              <CustomInput
                rules="required|emailRegex"
                name="Email"
                resLabel="3"
                resContent="7"
                label="Email"
                :value="user.email"
                @input="user.email = $event"
              />

              <ValidationProvider
                rules="required"
                name="Password"
                vid="password"
              >
                <b-form-group
                  label-cols-lg="3"
                  content-cols-lg="7"
                  slot-scope="{ valid, errors }"
                  label="Password"
                >
                  <b-form-input
                    type="password"
                    v-model="user.password"
                    :state="errors[0] ? false : valid ? true : null"
                    placeholder="Enter password"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                rules="required|confirmed:password"
                name="Confirm Password"
              >
                <b-form-group
                  label-cols-lg="3"
                  content-cols-lg="7"
                  slot-scope="{ valid, errors }"
                  label="Confirm Password"
                >
                  <b-form-input
                    type="password"
                    v-model="user.confirmation"
                    :state="errors[0] ? false : valid ? true : null"
                  >
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <CustomInput
                name="Phone"
                label="Phone"
                rules="required|phone"
                :value="user.mobile"
                resLabel="3"
                resContent="7"
                @input="user.mobile = $event"
              />
              <b-button block type="submit" variant="primary">Submit</b-button>
            </b-form>
          </ValidationObserver>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import CustomInput from "./CustomInput.vue";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmation: "",
      },
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    CustomInput,
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapActions(["createUser"]),
    onSubmit() {
      this.createUser({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.mobile,
        password: this.user.password,
        role: "user",
      }).then(() => {
        if (this.isAuth) {
          console.log(this.isAuth);
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scope>
.form-row {
  display: flex;
  padding: 0.5rem 0;
}
.form-group {
  text-align: left;
}
.invalid-feedback {
  text-align: left;
}
</style>
