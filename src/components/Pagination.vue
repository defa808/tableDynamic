<template>
  <nav>
    <ul>
      <li>
        <router-link
          v-if="curPage!=1"
          v-on:click.native="prevPage"
          :to="{ path: '/page/'+ (curPage - 1)}"
        >Previous</router-link>
        <span v-else class="disabled">Previous</span>
      </li>

      <template v-if="numPages <=6">
        <li v-for="n in numPages" :key="n">
          <router-link
            v-if="curPage!=n"
            v-on:click.native="setCurPage(n)"
            :to="{ path: '/page/'+ n}"
          >{{n}}</router-link>
          <span v-else class="active">{{n}}</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage <= 4">
        <li v-for="n in 5" :key="n">
          <router-link
            v-if="curPage!=n"
            v-on:click.native="setCurPage(n)"
            :to="{ path: '/page/'+ n}"
          >{{n}}</router-link>
          <span v-else class="active">{{n}}</span>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage > numPages - 4">
        <li>
          <span class="disabled">...</span>
        </li>
        <li v-for="n in [numPages-4, numPages-3, numPages-2, numPages-1, numPages]" :key="n">
          <router-link
            v-if="curPage!=n"
            v-on:click.native="setCurPage(n)"
            :to="{ path: '/page/'+ n}"
          >{{n}}</router-link>
          <span v-else class="active">{{n}}</span>
        </li>
      </template>

      <template v-else>
        <li>
          <router-link v-on:click.native="setCurPage(1)" :to="{ path: '/page/'+ 1}">{{1}}</router-link>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
        <li v-for="n in [curPage-1, curPage, curPage+1]" :key="n">
          <router-link
            v-if="curPage!=n"
            v-on:click.native="setCurPage(n)"
            :to="{ path: '/page/'+ n}"
          >{{n}}</router-link>
          <span v-else class="active">{{n}}</span>
        </li>
        <li>
          <span class="disabled">...</span>
        </li>
        <li>
          <router-link
            v-on:click.native="setCurPage(numPages)"
            :to="{ path: '/page/'+ numPages}"
          >{{numPages}}</router-link>
        </li>
      </template>

      <li>
        <router-link
          v-if="curPage!=numPages"
          v-on:click.native="nextPage"
          :to="{ path: '/page/'+ (curPage + 1)}"
        >Next</router-link>
        <span v-else class="disabled">Next</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["curPage"]),
    ...mapGetters(["numPages"])
  },

  created() {
    if (this.$route.params.page == undefined) this.setCurPage(1);
    else this.setCurPage(parseInt(this.$route.params.page));
  },

  methods: {
    setCurPage(n) {
      this.$store.commit("set", { key: "curPage", value: n });
    },

    prevPage() {
      this.$store.commit("set", { key: "curPage", value: this.curPage - 1 });
    },

    nextPage() {
      this.$store.commit("set", { key: "curPage", value: this.curPage + 1 });
    }
  }
};
</script>


<style>
nav {
  background-color: #ddd;
  border-radius: 5px;
  height: 30px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
}

nav ul li a {
  padding: 7px 8px;
  display: block;
  text-decoration: none;
  color: #337ab7;
}

nav ul li span {
  padding: 7px 8px;
  display: block;
}

nav ul li span.active {
  color: #fff;
}

nav ul li span.disabled {
  color: #777;
  cursor: not-allowed;
}
</style>