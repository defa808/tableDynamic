<template>
  <div id="app">
   <FileLoad/>
    <div class="app-header">
      <ShowItems/>
      <SearchItems/>
    </div>

    <TableData/>

    <div class="app-footer">
      <Info/>
      <Pagination/>
    </div>
  </div>
</template>

<script>
import TableData from "@/components/TableData.vue";
import ShowItems from "@/components/ShowItems.vue";
import SearchItems from "@/components/SearchItems.vue";
import Pagination from "@/components/Pagination.vue";
import Info from "@/components/Info.vue";
import FileLoad from "@/components/FileLoad.vue";

export default {
  name: "App",
  components: {
    TableData,
    ShowItems,
    SearchItems,
    Pagination,
    Info,
    FileLoad
    // Upload,
  },

  data: function() {
    return {
      uploadedFiles: []
    };
  },

  methods: {

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        this.$store.commit("set", {
          key: "data",
          value: JSON.parse(e.target.result)
        });
      };
      reader.readAsText(file);
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  color: #73879c;
  font-size: 14px;
}

#app {
  padding: 20px 20px;
}

.app-header,
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 2px;
}

.app-upload {
  padding: 10px 0;
}


</style>
