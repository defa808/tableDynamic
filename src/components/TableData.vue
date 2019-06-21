<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="`f${index}`"
            :class="[
            { sortAsc: field == sortKey && !reverse },
            { sortDesc: field == sortKey && reverse },
            ]"
            @click="sortBy(field)"
          >{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in orderedItems" :key="`r${index}`">
          <td v-for="(item, key) in row" :key="`r${key}`">
            <span v-if="edittingIndexCom.i === index && edittingIndexCom.j === key">
              <input v-model="edittingTemplate" class="input">
              <button @click="disableEditing(index,key)">Cancel</button>
              <button @click="saveEdit(index,key)">Save</button>
            </span>
            <span
              v-if="edittingIndexCom.i !== index || edittingIndexCom.j !== key"
              @click="enableEditing(index,key)"
            >
              {{index}} {{ key}}
              <span v-html="replaceText(item.toString())"/>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "TableData",
  data: function() {
    return { edittingTemplate: "", edittingIndex: { i: null, j: null } };
  },
  computed: {
    ...mapState(["searchText", "sortKey", "reverse"]),
    ...mapGetters(["fields", "rows"]),

    orderedItems() {
      let sortKey = this.sortKey;
      return _.orderBy(this.rows, sortKey, this.reverse ? "desc" : "asc");
    },

    edittingIndexCom: {
      get: function() {
        return { i: this.edittingIndex.i, j: this.edittingIndex.j };
      },
      set: function(obj) {
        this.edittingIndex = { i:obj.i, j:obj.j };
      }
    },

    getEdittingTemplate() {
      return this.edittingTemplate;
    }
  },

  methods: {
    replaceText(text) {
      return text.replace(
        new RegExp("(" + this.searchText + ")", "gim"),
        "<i>$1</i>"
      );
    },

    enableEditing(i, j) {
      this.edittingIndexCom = {i,j};
      this.edittingTemplate = this.orderedItems[i][j];
    },

    disableEditing(i, j) {
      this.edittingIndexCom = { i: null, j: null };
    },

    saveEdit(i, j) {
      this.orderedItems[i][j] = this.edittingTemplate;
      this.edittingIndexCom = { i: null, j: null };
    },

    sortBy(sortKey) {
      this.$store.commit("set", { key: "sortKey", value: sortKey });
      this.$store.commit("set", {
        key: "reverse",
        value: this.sortKey == sortKey ? !this.reverse : false
      });
    }
  }
};
</script>
<style lang="scss">
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 5px;
}

tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

th {
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 3px solid #ddd;
  font-family: "Glyphicons Halflings";
  position: relative;
  cursor: pointer;
}

th::after {
  content: "";
  position: absolute;
  top: 12px;
  right: 8px;
  display: block;
  opacity: 0.2;
  font-size: 0.7em;
}

th.sortAsc::after {
  content: "\25b2";
  opacity: 0.8;
}

th.sortDesc::after {
  content: "\25bc";
  opacity: 0.8;
}

td {
  border: 1px solid #ddd;
}

td,
th {
  padding: 8px;
}

i {
  display: inline-block;
  font-style: normal;
  background-color: yellow;
}
</style>
