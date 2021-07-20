<template>
  <header>
    <div class="container">
      <!-- <div class="d-flex">
        <p v-color="'red'">header</p>
      </div>
      <div>
        <b-form-select
          v-model="selected"
          :options="options"
          class="mb-3"
          value-field="item"
          text-field="name"
          disabled-field="notEnabled"
        ></b-form-select>
        <p>{{ selected }}</p>
      </div>
      <p>
        {{ $t("hello", { name: "Vu" }) }}
      </p>
      <p>{{ $t("hello", { name: "Vue.js" }) }}</p>

      <p>
        {{ $t("one") }}
      </p>
      <p>
        {{ $t("header.main") }}
      </p>
      <p>
        {{ $t("hoho") }}
      </p>
      <p>
        {{ $tc("soi", 0) }}
      </p> -->
      <div class="locale-changer">
        <select v-model="selected" @change="changeLocale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
            lang
          }}</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script>
import { localeChanged } from "vee-validate";
export default {
  data() {
    return {
      value: "",
      selected: JSON.parse(localStorage.getItem("i18n")) || "vi",
      options: [
        { item: "vi", name: "Vietnamese" },
        { item: "en", name: "English" },
      ],
      langs: ["vi", "en"],
    };
  },
  methods: {
    changeLocale(value) {
      localStorage.setItem("i18n", JSON.stringify(value.target.value));
      this.$i18n.locale = value.target.value;
      localeChanged();
    },
  },
};
</script>

<style></style>
