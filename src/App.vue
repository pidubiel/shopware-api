<template>
  <router-view v-bind:contextToken="contextToken"></router-view>
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
          //localStorage.setItem("sw-context-token", data["sw-context-token"]);
          this.contextToken = data["sw-context-token"];
          //console.log("Context token: ", this.contextToken);
        });
    },
    clear() {
      this.response = [];
      this.categories = [];
    }
  },
  created() {
    this.getContextToken();
    //this.fetchNavigation();
    //this.fetchProducts();
  }
};
</script>

<style></style>
