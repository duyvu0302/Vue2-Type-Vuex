<template>
  <ValidationProvider :rules="rules" :name="name">
    <b-form-group
      :label-cols-lg="resLabel"
      :content-cols-lg="resContent"
      slot-scope="{ valid, errors }"
      :label="label"
    >
      <b-form-input
        :type="type"
        :value="value"
        @input="$emit('input', $event)"
        :state="errors[0] ? false : valid ? true : null"
        :placeholder="placeholder"
      >
      </b-form-input>
      <b-form-invalid-feedback class="text-left">
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import i18n from "../i18n";

extend("phone", {
  validate(value) {
    const regex = /[[0-9]/;
    return regex.test(value);
  },
  message: "Wrong format",
});
extend("emailRegex", {
  validate(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  },
  message: i18n.t("messages.regexEmail"),
});

extend("min", {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ["length"],
});

export default {
  props: {
    type: String || "text",
    name: String,
    label: String,
    rules: String,
    value: String,
    resLabel: String,
    resContent: String,
    placeholder: String,
  },
  components: {
    ValidationProvider,
  },
};
</script>

<style></style>
