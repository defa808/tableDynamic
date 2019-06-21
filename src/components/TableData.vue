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
            <div v-if="edittingIndexCom.i === index && edittingIndexCom.j === key" class="form">
              <template v-if="typeof item == 'number'">
                <input v-model="edittingTemplate" type="number" class="input">
              </template>
              <template v-else-if="isDate(item)">
                <date-picker
                  valueType="format" 
                  :lang="'en'"
                  type="string"
                  v-model="edittingTemplate"
                ></date-picker>
              </template>
              <template v-else-if="typeof item == 'string'">
                <input v-model="edittingTemplate" type="text" class="input">
              </template>
              <template v-else-if="isArray(item)">
                <input v-model="edittingTemplate" type="text" class="input">
              </template>
              <div style="display:flex;flex-flow:row nowrap;">
                <b-button @click="saveEdit(index,key)" variant="success">Save</b-button>
                <b-button @click="disableEditing(index,key)" variant="danger">Cancel</b-button>
              </div>
            </div>
            <span
              v-if="edittingIndexCom.i !== index || edittingIndexCom.j !== key"
              @click="enableEditing(index,key)"
            >
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
import DatePicker from "vue2-datepicker";

export default {
  name: "TableData",
  data: function() {
    return { edittingTemplate: "", edittingIndex: { i: null, j: null } };
  },
  components: {
    DatePicker
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
        this.edittingIndex = { i: obj.i, j: obj.j };
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


    isArray(item) {
      return Array.isArray(item);
    },

    isDate(item) {
      let checkDate = new Date(item);
      return checkDate != "Invalid Date";
    },

    enableEditing(i, j) {
      this.edittingIndexCom = { i, j };
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
  max-width: 200px !important;
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

.mx-calendar-icon {
  height: auto;
}

.form {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 35px;
  margin: 0px;
  padding: 0px;

  button:first-child {
    margin-right: 15px;
    margin-left: 20px;
  }
}

.input {
  width: 100%;
}
</style>
