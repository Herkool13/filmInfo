<template>
  <div class="flex">
    <litepie-datepicker
      separator=" to "
      :formatter="formatter"
      :auto-apply="false"
      v-model="dateValue"
    ></litepie-datepicker>
    
  </div>
</template>

<script>
import { ref, watch } from "vue";
import LitepieDatepicker from "litepie-datepicker";

export default {
  components: {
    LitepieDatepicker,
  },
  setup(props,{emit}) {
    const dateValue = ref([]);
    const formatter = ref({
      date: 'DD MM YYYY',
      month: 'MM'
    })
    watch(dateValue,()=>emit('filterDate',dateValue))
    return {
      dateValue,formatter
    };
  },
};
</script>
<style scoped>
p {
  width: 1024px;
  height: 85px;
  background: #e2e2e2;
  border-radius: 6px;
  margin: auto;
  margin-top: 69px;
}
</style>