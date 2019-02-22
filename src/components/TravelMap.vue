<template lang="pug">
  GoogleMapLoader(:mapConfig="mapConfig", apiKey="AIzaSyBVYiwPWVIsYzgHS8zlxv16XwJbOpEUmjI", :center="center", :zoom="zoom", :markers="markers", :bounds="bounds", ref="googleMapLoader")
    template(slot-scope="{ google, map }")
      div.ooboo
        GoogleMapMarker(v-for="marker in markers", :key="marker.id", :marker="marker", :google="google", :map="map", @click.native="displayInfo", @mouseover="displayInfo", @hover="displayInfo")
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapInfoWindow from "./GoogleMapInfoWindow";

import { mapSettings } from "../constants/mapSettings";

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapInfoWindow
  },
  props: {
    markers: Array,
    center: Object,
    infoWindow: Object,
    zoom: Number
  },
  data() {
    return {
      bounds: {},
      lines: [
        {
          id: "1",
          path: [{ lat: 3, lng: 101 }, { lat: 5, lng: 99 }]
        }
      ]
    };
  },
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.center,
        zoom: this.zoom
      };
    }
  },
  watch: {
    markers: function (val) {
      var bounds = new google.maps.LatLngBounds();
      for (var m = 0; m < this.markers.length; m++) {
        bounds.extend(this.markers[m].position);
      }
      this.bounds = bounds;

    }
  },
  methods: {
    displayInfo() {
      console.log('j');

    }
  }
};
</script>
