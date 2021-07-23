<template>
    <div class="payment">
        <div class="container">
            <b-row align-h="center">
                <b-col cols="8">
                    <ValidationObserver
                        v-slot="{ handleSubmit }"
                        ref="observer"
                    >
                        <b-form @submit.prevent="handleSubmit(onSubmit)">
                            <CustomInput
                                rules="required"
                                name="Name"
                                resLabel="3"
                                resContent="7"
                                label="Name"
                                v-model="user.name"
                                placeholder="Enter name"
                            />
                            <CustomInput
                                rules="required|emailRegex"
                                name="Email"
                                resLabel="3"
                                resContent="7"
                                label="Email"
                                v-model="user.email"
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
                                        :state="
                                            errors[0]
                                                ? false
                                                : valid
                                                ? true
                                                : null
                                        "
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
                                        :state="
                                            errors[0]
                                                ? false
                                                : valid
                                                ? true
                                                : null
                                        "
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
                                v-model="user.mobile"
                                resLabel="3"
                                resContent="7"
                            />
                            <b-button block type="submit" variant="primary"
                                >Submit</b-button
                            >
                        </b-form>
                    </ValidationObserver>
                </b-col>
            </b-row>
        </div>
    </div>
</template>
<script lang="ts">
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import CustomInput from './CustomInput.vue';

import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { User } from '@/types';

type test = {
    name?: string;
    email?: string;
    mobile?: number | null;
    password?: string;
    confirmation?: string;
};
@Component({
    components: {
        CustomInput,
        ValidationObserver,
        ValidationProvider,
    },
})
export default class Register extends Vue {
    user: User = {
        name: '',
        email: '',
        mobile: null,
        password: '',
        confirmation: '',
    };
    hehe!: test;
    @Getter('isAuth') readonly isAuth!: boolean;
    @Action('createAccount') readonly createAccount!: Function;
    onSubmit(): void {
        this.createAccount({
            name: this.user.name,
            email: this.user.email,
            phone: this.user.mobile,
            password: this.user.password,
            role: 'user',
        }).then(() => {
            if (this.isAuth) this.$router.push('/');
        });
    }
    // computed: {
    //   ...mapGetters(["isAuth"]),
    // },
    // methods: {
    //   ...mapActions(["createUser"]),
    //   onSubmit() {
    //     this.createUser({
    //       name: this.user.name,
    //       email: this.user.email,
    //       phone: this.user.mobile,
    //       password: this.user.password,
    //       role: "user",
    //     }).then(() => {
    //       if (this.isAuth) {
    //         console.log(this.isAuth);
    //         this.$router.push("/");
    //       }
    //     });
    //   },
    // },
}
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
