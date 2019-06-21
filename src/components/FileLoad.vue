<template>
  <div id="loadFile">
    <div style="visibility:hidden; opacity:0" id="dropzone">
      <div id="textnode">Drop files to add data.</div>
    </div>
    <div style="width:100%;display:flex;justify-content:center;">
      <div class="custom-file" style="width:300px;margin:10px; 10px;">
        <input
          type="file"
          class="custom-file-input"
          id="customFileLang"
          @change="onFileChange"
          lang="ru"
        >
        <label class="custom-file-label" for="customFileLang">Choose File</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: function() {
    return {
      uploadedFiles: []
    };
  },
  mounted() {
    var self = this;
    window.addEventListener("dragenter", function(e) {
      document.querySelector("#dropzone").style.visibility = "";
      document.querySelector("#dropzone").style.opacity = 1;
      document.querySelector("#textnode").style.fontSize = "48px";
    });

    window.addEventListener("dragleave", function(e) {
      e.preventDefault();

      document.querySelector("#dropzone").style.visibility = "hidden";
      document.querySelector("#dropzone").style.opacity = 0;
      document.querySelector("#textnode").style.fontSize = "42px";
    });

    window.addEventListener("dragover", function(e) {
      e.preventDefault();
      document.querySelector("#dropzone").style.visibility = "";
      document.querySelector("#dropzone").style.opacity = 1;
      document.querySelector("#textnode").style.fontSize = "48px";
    });

    window.addEventListener("drop", function(e) {
      e.preventDefault();
      document.querySelector("#dropzone").style.visibility = "hidden";
      document.querySelector("#dropzone").style.opacity = 0;
      document.querySelector("#textnode").style.fontSize = "42px";

      var files = e.dataTransfer.files;
      self.uploadFiles(files);
    });
  },

  methods: {
    uploadFiles: function(f) {
      var self = this;

      function loadFiles(file) {
        // Pull the file name and remove the ".txt" extension
        var name =
          file.name.substr(0, file.name.lastIndexOf(".json")) || file.name;
        var reader = new FileReader();

        reader.onload = function(e) {
          
            return self.$store.commit("set", {
              key: "data",
              value: JSON.parse(e.target.result)
            });
         
        };
        reader.readAsText(file, "UTF-8");
      }

      for (var i = 0; i < f.length; i++) {
        if (f[i].type !== "application/json") {
          //if text file is not submitted alert and skip over it
          alert("Sorry, " + f[i].type + " is not an accepted file type.");
          continue;
        } else {
          if (this.uploadedFiles.length > 0) {
            if (
              !this.checkDuplicateFile(
                f[i].name.substr(0, f[i].name.lastIndexOf(".json"))
              )
            ) {
              loadFiles(f[i]);
            }
          } else {
            loadFiles(f[i]);
          }
        }
      }
    },
    checkDuplicateFile: function(filename) {
      if (this.uploadedFiles.find(el => el.fileName === filename)) {
        alert("Duplicate file: " + filename);
        return true;
      } else {
        return false;
      }
    },

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
/*Drag and drop file*/
#file-panel {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
}

.panel-body {
  height: auto;
}

#upload-list {
  height: auto;
  padding: 0px;
}

ul {
  list-style-type: none;
}

div#dropzone {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: visibility 175ms, opacity 175ms;
  display: table;
  text-shadow: 1px 1px 2px #000;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
}
div#textnode {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  transition: font-size 175ms;
}
</style>
