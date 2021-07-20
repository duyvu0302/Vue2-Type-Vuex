<template>
    <div class="cart">
        <div class="container">
            <div class="row">
                <b-table
                    :fields="fields"
                    responsive="sm"
                    striped
                    hover
                    :items="cart"
                >
                    <template #cell(index)="data">
                        {{ data.index + 1 }}
                    </template>
                    <template #cell(title)="data">
                        {{ data.item.title }}
                    </template>
                    <template #cell(count)="data">
                        <b-input
                            type="number"
                            @change="(e) => changCount(e, data.item.id)"
                            :value="data.item.quantity"
                        />
                    </template>
                    <template #cell(completed)="data">
                        <i>{{ data.item.isCompleted }}</i>
                    </template>
                    <template #cell(price)="data">
                        <i>{{
                            (
                                data.item.price * data.item.quantity
                            ).toLocaleString()
                        }}</i>
                    </template>
                </b-table>
            </div>
            <div class="row">
                <p>Total: {{ totalPrice().toLocaleString() }} Đ</p>
            </div>
            <b-button class="btn btn-primary">
                <router-link :to="'/register'">
                    Thanh Toan
                </router-link>
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Task } from '@/types';
@Component
export default class Cart extends Vue {
    fields: Array<string | { key: string; label: string }> = [
        'index',
        { key: 'title', label: 'TITLE' },
        'completed',
        'count',
        'price',
    ];
    cart: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

    totalPrice(): number {
        return this.cart.reduce((total: number, task: Task): number => {
            return (total = total + task.price! * task.quantity!);
        }, 0);
    }
    changCount(value: number, id: number): any {
        console.log(
            '🚀 ~ file: cart.vue ~ line 70 ~ Cart ~ changCount ~ value',
            value
        );
        if (value < 1) value = 1;
        let indexId = this.cart.findIndex((item: Task) => item.id === id);
        let productInner = this.cart.find((item: Task) => item.id === id);
        if (indexId !== -1) {
            this.cart.splice(indexId, 1, {
                ...productInner,
                quantity: value,
            });
        }
        localStorage.setItem('tasks', JSON.stringify(this.cart));
    }
}
// computed: {
//   totalPrice() {
//     return this.cart.reduce((total, task) => {
//       return (total = total + parseInt(task.price * task.count));
//     }, 0);
//   },
// },

// mounted() {
//   this.cart = JSON.parse(localStorage.getItem("tasks"));
//   this.isBusy = true;
// },
// methods: {
//   changCount(value, id) {
//     if (value < 1) value = 1;
//     let indexId = this.cart.findIndex((item) => item.id === id);

//     let cartInner = this.cart.find((item) => item.id === id);

//     if (indexId !== -1) {
//       this.cart.splice(indexId, 1, { ...cartInner, count: parseInt(value) });
//       localStorage.setItem("tasks", JSON.stringify(this.cart));
//     }
//   },
// },
</script>

<style lang="scss">
a {
    text-decoration: none;
    color: white;
    &:hover {
        color: white;
    }
}
</style>
