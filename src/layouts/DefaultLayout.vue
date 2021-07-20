<template>
    <div>
        <h1>Layout user</h1>

        <Header />
        <main>
            <slot />
        </main>
        <Foorer />
    </div>
</template>

<script>
import Header from '../components/header.vue';
import Foorer from '../components/footer.vue';
export default {
    components: {
        Header,
        Foorer,
    },
    watch: {},
};
</script>

<style></style>
