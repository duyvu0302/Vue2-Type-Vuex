<template>
    <div class="login">
        <div class="container">
            <b-row align-h="center">
                <b-col cols="8">
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <b-form @submit.prevent="handleSubmit(onSubmit)">
                            <CustomInput
                                rules="required|emailRegex"
                                name="Email"
                                label="Email"
                                resLabel="3"
                                resContent="7"
                                v-model="user.email"
                                placeholder="Enter Email"
                            />
                            <CustomInput
                                type="password"
                                rules="required|min:6"
                                name="Password"
                                label="Password"
                                resLabel="3"
                                resContent="7"
                                v-model="user.password"
                                placeholder="Enter Password"
                            />
                            <b-button class="btn btn-primary" type="submit">{{
                                $t('LOGIN')
                            }}</b-button>
                        </b-form>
                    </ValidationObserver>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="ts">
import CustomInput from './CustomInput.vue';
import { ValidationObserver } from 'vee-validate';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

interface initialValue {
    email: string | null;
    password: string | null;
}
@Component({
    components: {
        CustomInput,
        ValidationObserver,
    },
})
export default class Login extends Vue {
    user: initialValue = {
        email: null,
        password: null,
    };
    @Getter('isAuth') readonly isAuth!: boolean;
    @Action('login') readonly login!: Function;

    onSubmit(): void {
        this.login({
            email: this.user.email,
            password: this.user.password,
        }).then(() => {
            if (this.isAuth === true) this.$router.push('/');
        });
    }
    // computed: {
    //     ...mapGetters(['isAuth']),
    // },
    // methods: {
    //     ...mapActions(['login']),

    //     onSubmit() {
    //         console.log('hehe');
    //         this.login({
    //             email: this.user.email,
    //             password: this.user.password,
    //         }).then(() => {
    //             this.isAuth && this.$router.push('/');
    //         });
    //     },
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
