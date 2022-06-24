<template>
  <div class="flex flex-row justify-start items-center search-box">
    <p class="search-text">Search by release date:</p>
    <div class="flex">
      <litepie-datepicker
        separator=" to "
        :formatter="formatter"
        :shortcuts="false"
        :auto-apply="false"
        v-model="dateValue"
      ></litepie-datepicker>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import LitepieDatepicker from "litepie-datepicker";

export default {
  components: {
    LitepieDatepicker,
  },
  setup(props, { emit }) {
    const dateValue = ref([]);
    // dateValue.value = JSON.parse(localStorage.getItem("timeRange"));
    // watch(dateValue, () => {
    //   localStorage.setItem("timeRange", JSON.stringify(dateValue.value));
    // });
    const formatter = ref({
      date: "DD MM YYYY",
      month: "MM",
    });
    watch(dateValue, () => emit("filterDate", dateValue));
    return {
      dateValue,
      formatter,
    };
  },
};
</script>
<style >
.search-box {
  background-color: #e2e2e2;
  width: 1024px;
  height: 85px;
  border-radius: 6px;
  margin-top: 69px;
}
.search-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-left: 81px;
  margin-right: 29px;
}
</style>