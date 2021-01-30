<template>
  <b-row>
    <div class="navbar fixed-bottom">
      <span>Tim Jovchevski</span><span> {{ year }}</span>
    </div>
  </b-row>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>