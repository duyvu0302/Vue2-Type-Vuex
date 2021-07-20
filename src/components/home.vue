<template>
  <div class="hello">
    <!-- <p v-show="isShow">hello componasdfsadfents</p>
    <button @click="isShow = !isShow">an/hien</button>
    <p :class="{ dachon: isShow }">hehe</p>
    <p>{{ msg }}</p>
    <input type="text" v-model="name" />
    <p v-on:click="name = 'hahA'">click</p>
    <p>{{ name }}</p> -->
    <!-- <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option value="1">A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    <br />
    <span>Checked names: {{ checkedNames }}</span>
  </div> -->
    <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
    <router-link to="/">About</router-link>
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      isShow: true,
      selected: "",
      name: "hehe",
      checkedNames: [],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dachon {
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
