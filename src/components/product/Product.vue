<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <h1>Product</h1>
    <h2>Stock: {{ productData.stock }}</h2>
    <h6>Product ID: {{ id }}</h6>
    <img v-bind:src="productData.cover.media.thumbnails[0].url" alt="Product image" style="max-height: 200px;" />
    <h6>Product Name: {{ productData.translated.name }}</h6>
    <h6>Product Description: {{ productData.translated.description }}</h6>
    <table class="table table-sm mt-5 col-lg-6">
      <tbody>
        <tr>
          <td><strong>color</strong></td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td><strong>content</strong></td>
          <td>@fat</td>
        </tr>
        <tr>
          <td><strong>length</strong></td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td><strong>textile</strong></td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td><strong>width</strong></td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      productData: [],
    };
  },
  methods: {
    fetchProduct() {
      const config = { 'sw-access-key': 'SWSCZNJ1SKHBEXLUMWM1VMVPSG' };
      this.$http
        .get(`http://192.168.33.10/sales-channel-api/v1/product/${this.id}`, {
          headers: config,
        })
        .then((res) => res.json())
        .then((data) => {
          this.productData = data.data;
          console.log('Single Product Data: ', data);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>
