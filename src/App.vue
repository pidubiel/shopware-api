<template>
  <div>
    <div class="container pl-0 pr-0">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#">
          <router-link style="color: black" to="/">
            <strong>Demo</strong>store
          </router-link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li v-for="category in categories" :key="category.mediaId" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ category.name }}</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a
                  v-for="subcategory in category.children"
                  :key="subcategory.id"
                  class="dropdown-item"
                  href="#"
                >{{ subcategory.name }}</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container mb-3">
        <button
          class="btn btn-warning"
          style="font-size: 10px"
          @click="getContextToken"
        >Refresh token</button>
      </div>
    </div>
    <router-view v-bind:contextToken="contextToken"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: ""
      },
      response: [],
      categories: [],
      contextToken: ""
    };
  },
  methods: {
    getContextToken() {
      const config = {
        "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG"
      };
      this.$http
        .post(`http://192.168.33.10/sales-channel-api/v1/checkout/cart`, null, {
          headers: config
        })
        .then(res => res.json())
        .then(data => {
          this.contextToken = data["sw-context-token"];
        });
    },
    fetchNavigation() {
      const config = { "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG" };
      this.$http
        .get(
          "http://192.168.33.10/store-api/v1/navigation/main-navigation/main-navigation",
          {
            headers: config
          }
        )
        .then(res => res.json())
        .then(data => {
          this.categories = data;
          console.log("Navigation: ", this.categories);
        });
    },
    clear() {
      this.response = [];
      this.categories = [];
    }
  },
  created() {
    this.getContextToken();
    this.fetchNavigation();
  }
};
</script>

<style></style>
