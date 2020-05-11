<template>
  <div class="container pl-0 pr-0">
    <nav class="navbar navbar-expand-lg navbar-light">
      <a class="navbar-brand" href="#">
        <strong>Demo</strong>store
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
    <div class="container mt-4">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Shopware API</h1>
          <button class="btn btn-success" @click="fetchProducts">Get Products</button>
          <button class="btn btn-success" @click="fetchNavigation">Fetch Navigation</button>
          <button class="btn btn-danger" @click="clear()">Clear</button>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-5">
        <div v-for="item in response" :key="item.id" class="col mb-4">
          <div class="card">
            <img
              v-bind:src="item.cover.media.thumbnails[0].url"
              class="card-img-top"
              style="max-height: 150px"
              alt="..."
            />
            <div class="card-body text-center">
              <h5 class="card-title text-left" style="min-height: 80px">{{ item.translated.name }}</h5>
              <p
                class="card-text text-left"
                style="font-size: 12px; min-height: 110px"
              >{{ item.translated.description }}</p>
              <h3 class="text-center">
                <strong>{{ item.price[0].gross }}$</strong>
              </h3>
              <button class="btn btn-primary">Add to shopping cart</button>
            </div>
          </div>
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
          console.log(data);
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
    this.fetchNavigation();
    this.fetchProducts();
  }
};
</script>

<style>
</style>
