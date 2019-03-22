<template>
  <div id="app">
    <WaitingList />
  </div>
</template>

<script>
import WaitingList from "./components/WaitingList.vue";

export default {
  name: "app",
  components: {
    WaitingList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
