<template>
  <fieldset class="form__block color-bar-container">
    <legend class="form__legend">{{ title }}</legend>
    <ul class="colors colors--black">
      <li v-for="item in arr" :key="item.id" class="colors__item">
        <label class="colors__label" :title="item.title">
          <input
            class="colors__radio sr-only"
            type="checkbox"
            :value="value"
            v-model="model[item.id]"
          />
          <span class="colors__value" :style="{ backgroundColor: item.code }">
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { toRefs, computed } from "vue";
export default {
  props: ["title", "arr", "value"],
  setup(props, { emit }) {
    const { title } = toRefs(props);
    const { arr } = toRefs(props);
    const model = computed({
      get: () => props.value,
      set: (value) => {
        emit("update:value", value);
      },
    });
    console.log(Object.keys(toRefs(props)));

    console.log(title, arr);

    return { title, arr, model };
  },
};
</script>

<style lang="scss" scoped>
</style>