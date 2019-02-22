<template lang="pug">
  div
    div.google-map(ref="googleMap")
    template(v-if="Boolean(this.google) && Boolean(this.map)")
      slot(:google="google", :map="map")
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    apiKey: String,
    mapConfig: Object,
    bounds: Object,
    center: Object,
    zoom: Number
  },
  data() {
    return {
      google: null,
      map: null
    };
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      var buildMap = new this.google.maps.Map(mapContainer, this.mapConfig);
      this.map = buildMap;
    }
  },
  watch: {
    center: function (val) {
      this.initializeMap();
      this.map.fitBounds(this.bounds);
    }
  }
};
</script>

<style scoped>
  .google-map {
    width: 100%;
    min-height: 100%;
  }
</style>
