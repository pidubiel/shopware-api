<template>
  <div class="container-fluid pl-0 pr-0">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
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
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Shopware API</h1>
          <button @click="fetchProducts">Get Products</button>
          <button @click="fetchNavigation">Fetch Navigation</button>
          <button @click="clear()">Clear</button>
          <ul>
            <li v-for="item in response" :key="item.id">{{ item.translated.name }}</li>
          </ul>
          <!-- <ul>
            <li v-for="category in categories" :key="category.mediaId">
              {{ category.name }}
              <ul>
                <li
                  v-for="subcategory in category.children"
                  :key="subcategory.id"
                >{{ subcategory.name }}</li>
              </ul>
            </li>
          </ul>-->
        </div>
      </div>
    </div>
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
      categories: []
    };
  },
  methods: {
    fetchProducts() {
      const config = { "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG" };
      this.$http
        .get("http://192.168.33.10/sales-channel-api/v1/product", {
          headers: config
        })
        .then(res => res.json())
        .then(data => {
          this.response = data.data;
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
  }
};
</script>

<style>
</style>
