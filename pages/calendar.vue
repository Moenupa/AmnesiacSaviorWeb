<template>
  <div id="calendar">
    <date-picker v-model="targetdate" placeholder="Select Date"></date-picker>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  components: { DatePicker },
  data() {
    return {
      targetdate: null,
    };
  },
};
</script>

<style></style>