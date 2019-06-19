<template>
  <div class="info-wrap">
    Info:
    <div>Current page: {{curPage}}</div>
    <div>Last page: {{numPages}}</div>
    <div>Showing elements from {{startCount}} to {{endCount}}</div>
    <div v-if="searchText != ''">Searching by {{searchText}}</div>
    <div v-if="sortKey != ''">
      Sorting by field '{{sortKey}}'
      <span v-if="reverse">reversed</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Info",

  computed: {
    ...mapState(["curPage", "searchText", "sortKey", "reverse"]),
    ...mapGetters(["numPages", "endCount", "startCount"])
  }
};
</script>

<style>
.info-wrap {
  background-color: #ddd;
  border-radius: 5px;
  padding: 10px 20px;
}
</style>