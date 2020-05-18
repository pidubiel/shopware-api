<template>
  <div class="container">
    <h1 class="mb-3">Checkout</h1>
    <button @click="printShippingInfo" class="btn btn-warning">Print shippingInfo</button>
    <hr />
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Product name</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">-$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code" />
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Shipping information</h4>
        <form class="needs-validation" novalidate>
          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Salutation*</label>
              <select
                class="custom-select d-block w-100"
                id="country"
                required
                v-model="shippingInfo.salutation"
              >
                <option value disabled="disabled">Enter Salutation...</option>
                <option>Not specified</option>
                <option>Mrs.</option>
                <option>Mr.</option>
              </select>
              <div class="invalid-feedback">Please select a valid country.</div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.firstName"
                id="firstName"
                placeholder="Enter first name..."
                value
                required
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.lastName"
                id="lastName"
                placeholder="Enter last name..."
                value
                required
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email*</label>
            <input
              type="email"
              class="form-control"
              v-model="shippingInfo.email"
              id="email"
              placeholder="you@example.com"
            />
            <div class="invalid-feedback">Please enter a valid email address for shipping updates.</div>
          </div>

          <p class="mt-5">
            <strong>Your address</strong>
          </p>
          <hr />

          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="zip">Street address*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.street"
                id="zip"
                placeholder="Enter street address..."
                required
              />
              <div class="invalid-feedback">Zip code required.</div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">Postal code*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.zipCode"
                id="zip"
                placeholder="Enter postal code..."
                required
              />
              <div class="invalid-feedback">Zip code required.</div>
            </div>
            <div class="col-md-4 mb-3">
              <label for="zip">City*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.city"
                id="zip"
                placeholder="Enter city..."
                required
              />
              <div class="invalid-feedback">Zip code required.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label for="address">Country*</label>
              <input
                type="text"
                class="form-control"
                v-model="shippingInfo.country"
                id="address"
                placeholder="Enter country..."
                required
              />
              <div class="invalid-feedback">Please enter your shipping address.</div>
            </div>
          </div>

          <hr class="mb-4" />
        </form>
        <button @click="getSalutation" class="btn btn-primary btn-lg btn-block">Get salutation</button>
        <button @click="getCountry" class="btn btn-primary btn-lg btn-block">Get country</button>
        <button @click="simpleOrder" class="btn btn-primary btn-lg btn-block">Simple order</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contextToken"],
  data() {
    return {
      shippingInfo: {
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        zipCode: "",
        city: "",
        country: ""
      }
    };
  },
  methods: {
    printShippingInfo: function() {
      console.log(this.shippingInfo);
    },
    getCountry: function() {
      let headers = {
        "Content-Type": "application/json",
        "SW-Access-Key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG"
      };
      const url = `http://192.168.33.10/sales-channel-api/v1/country?filter[iso3]=deu`;
      return fetch(url, { method: "GET", headers })
        .then(resp => resp.json())
        .then(({ data }) => {
          console.log(data);
          return data;
        });
    },
    getSalutation: function() {
      let headers = {
        "Content-Type": "application/json",
        "SW-Access-Key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG"
      };
      const url = `http://192.168.33.10/sales-channel-api/v1/salutation`;
      return fetch(url, { method: "GET", headers })
        .then(resp => resp.json())
        .then(json => {
          console.log("Salutation: ", json.data[0].id);
          this.shippingInfo.salutation = json.data[0].id;
          return json.data[0];
        });
    },
    guestOrder: function() {
      const customer = {
        guest: true,
        firstName: this.shippingInfo.firstName,
        lastName: this.shippingInfo.lastName,
        email: this.shippingInfo.email,
        billingStreet: this.shippingInfo.street,
        billingZipcode: this.shippingInfo.zipCode,
        billingCity: this.shippingInfo.city
      };
      let headers = {
        "Content-Type": "application/json",
        "SW-Access-Key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG",
        "sw-context-token": this.contextToken
      };
      const url = `http://192.168.33.10/sales-channel-api/v1/checkout/guest-order`;
      const body = JSON.stringify(customer);
      return fetch(url, { method: "POST", headers, body })
        .then(resp => resp.json())
        .then(({ data }) => {
          console.log("Guest Order: ", data);
          return data;
        });
    },
    simpleOrder: function() {
      console.log("Shipping INFO: ", this.shippingInfo);
      const customer = {
        salutationId: this.shippingInfo.salutation,
        guest: true,
        firstName: this.shippingInfo.firstName,
        lastName: this.shippingInfo.lastName,
        email: this.shippingInfo.email,
        billingAddress: {
          salutationId: this.shippingInfo.salutation,
          countryId: "b735f5eefb8b4c8395db41b5a9803a01",
          street: this.shippingInfo.street,
          zipcode: this.shippingInfo.zipCode,
          city: this.shippingInfo.city
        }
      };
      const body = JSON.stringify(customer);
      const config = {
        "Content-Type": "application/json",
        "sw-access-key": "SWSCZNJ1SKHBEXLUMWM1VMVPSG",
        "sw-context-token": this.contextToken
      };
      this.$http
        .post(
          `http://192.168.33.10/sales-channel-api/v1/checkout/guest-order`,
          body,
          {
            headers: config
          }
        )
        .then(res => res.json())
        .then(data => {
          //this.cart = data.data.lineItems;
          console.log("SimpleOrder: ", data);
          return data;
        });
    }
  }
};
</script>