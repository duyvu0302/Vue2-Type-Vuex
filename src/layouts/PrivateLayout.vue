<template>
  <div>
    <Header />
    <main>
      <h1>Layout admin</h1>
      <slot />
    </main>
  </div>
</template>

<script>
import Header from "../components/header.vue";
export default {
  components: {
    Header,
  },
  watch: {},
};
</script>

<style></style>
