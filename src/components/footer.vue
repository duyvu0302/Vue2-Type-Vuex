<template>
    <footer class="pt-5">
        &copy; Copy right STORM
        <h2>
            {{ $t('FOOTER') }}
        </h2>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            message: 'mess components',
        };
    },
    created() {
        console.log('mixin components');
        console.log(this.message);
    },

    // directives: {
    //   red: {
    //     inserted: function(el, binding) {
    //       const color = binding.value;
    //       let i = 0;
    //       setInterval(() => {
    //         el.style.color = color[i++];
    //         // if (i > color.length - 1) i = 0;
    //       }, 1000);
    //     },
    //   },
    // },
};
</script>

<style></style>
