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
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-3">
          <h1>Shopware API</h1>
          <h2 style="font-size: 10px">Context token: {{contextToken}}</h2>
          <button class="btn btn-success" @click="fetchProducts">Get Products</button>
          <button class="btn btn-success" @click="fetchNavigation">Fetch Navigation</button>
          <button class="btn btn-danger" @click="clear()">Clear</button>
          <!-- <button class="btn btn-danger" @click="clearCart()">Clear Cart</button> -->
          <div v-if="cart.length>0" class="cart mt-4">
            <h1>Cart</h1>
            <table class="table table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in cart" :key="index">
                  <td>{{ product.label }}</td>
                  <td>{{ product.price.totalPrice }}$</td>
                  <td>
                    <button class="btn btn-danger" @click="removeFromCart(product.id)">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>Total Price: {{totalPrice}}$</h3>
          </div>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-5">
        <div v-for="item in response" :key="item.id" class="col mb-4">
          <div class="card">
            <img
              v-bind:src="item.cover.media.thumbnails[0].url"
              class="card-img-top"
              style="max-height: 150px;"
              alt="..."
            />
            <div class="card-body text-center">
              <h5 class="card-title text-left" style="min-height: 80px;">
                <router-link :to="`/product/${item.id}`">{{ item.translated.name }}</router-link>
              </h5>
              <p
                class="card-text text-left"
                style="font-size: 12px; min-height: 110px;"
              >{{ item.translated.description }}</p>
              <h3 class="text-center">
                <strong>{{ item.price[0].gross }}$</strong>
              </h3>
              <button class="btn btn-primary" @click="addToCart(item.id)">Add to shopping cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contextToken"],
  data() {
    return {
      response: [],
      categories: [],
      cart: [],
      addToCartTest: []
    };
  },
  computed: {
    totalPrice: function() {
      return this.cart.reduce((acc, val) => acc + val.price.totalPrice, 0);
    }
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
          console.log("All products: ", data);
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
    fetchCart() {
      const config = {
        "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG",
        "sw-context-token": this.contextToken
      };
      this.$http
        .get("http://192.168.33.10/sales-channel-api/v1/checkout/cart", {
          headers: config
        })
        .then(res => res.json())
        .then(data => {
          this.cart = data.data.lineItems;
        });
    },
    printProductId(id) {
      console.log("Product ID: ", id);
    },
    addToCart(id) {
      const config = {
        "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG",
        "sw-context-token": this.contextToken
      };
      this.$http
        .post(
          `http://192.168.33.10/sales-channel-api/v1/checkout/cart/product/${id}`,
          null,
          {
            headers: config
          }
        )
        .then(res => res.json())
        .then(data => {
          this.cart = data.data.lineItems;
        });
    },
    removeFromCart(id) {
      const config = {
        "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG",
        "sw-context-token": this.contextToken
      };
      this.$http
        .delete(
          `http://192.168.33.10/sales-channel-api/v1/checkout/cart/line-item/${id}`,
          {
            headers: config
          }
        )
        .then(res => res.json())
        .then(data => {
          this.cart = data.data.lineItems;
        });
    },
    clear() {
      this.response = [];
      this.categories = [];
    },
    clearCart() {
      this.cart = [];
    }
  },
  created() {
    console.log("123");
    // this.getContextToken();
    this.fetchNavigation();
    this.fetchProducts();
    this.fetchCart();
  }
};
</script>
