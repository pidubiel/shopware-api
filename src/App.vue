<template>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
      },
      response: [],
      categories: [],
    };
  },
  methods: {
    fetchProducts() {
      const config = { 'sw-access-key': 'SWSCZNJ1SKHBEXLUMWM1VMVPSG' };
      this.$http
        .get('http://192.168.33.10/sales-channel-api/v1/product', {
          headers: config,
        })
        .then((res) => res.json())
        .then((data) => {
          this.response = data.data;
          console.log(data);
        });
    },
    fetchNavigation() {
      const config = { 'sw-access-key': 'SWSCZNJ1SKHBEXLUMWM1VMVPSG' };
      this.$http
        .get('http://192.168.33.10/store-api/v1/navigation/main-navigation/main-navigation', {
          headers: config,
        })
        .then((res) => res.json())
        .then((data) => {
          this.categories = data;
          console.log('Navigation: ', this.categories);
        });
    },
    clear() {
      this.response = [];
      this.categories = [];
    },
  },
  created() {
    this.fetchNavigation();
    this.fetchProducts();
  },
};
</script>

<style></style>
