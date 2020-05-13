<template>
  <div>
    <button class="btn btn-warning" style="font-size: 10px" @click="getContextToken">Refresh token</button>
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
    clear() {
      this.response = [];
      this.categories = [];
    }
  },
  created() {
    this.getContextToken();
  }
};
</script>

<style></style>
