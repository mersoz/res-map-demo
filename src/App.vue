<template lang="pug">
  div
    button(type="button", @click="retrieveProperties", :disabled="disableButton")
      | Retrieve properties

    TravelMap.travel-map(:markers="markers", :center="center", :zoom="zoom", :infoWindow="infoWindow")

    div.instructions
      p
        | Click
        b  Retrieve Properties
        |  to get properties, the map will zoom to the markers
      p Hover over a marker to display info popup with property details and a StreetView image
      p
        | Click on the map to close all popups and
        b  X
        |  to close individual popups
</template>

<script>
  import axios from 'axios';
  import mergeByKey from "array-merge-by-key";

  import TravelMap from "./components/TravelMap";

  export default {
    name: "App",
    components: {
      TravelMap
    },
    data() {
      return {
        errors: [],
        features: [],
        locations: [],
        markers: [],
        infoWindow: null,

        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 12,

        disableButton: false
      }
    },
    methods: {
      retrieveProperties() {
        const vm = this;
        vm.disableButton = true;

        const corsUrl = 'https://morning-sea-48633.herokuapp.com/';
        const resoluteUrl = 'http://resolute-204310.appspot.com/';
        axios.defaults.baseURL = corsUrl + resoluteUrl;

        function getLocations() {
          return axios.get('/locations');
        }

        function getFeatures() {
          return axios.get('/features');
        }

        axios.all([getLocations(), getFeatures()])
          .then(axios.spread(function (locations, features) {
            for(var d = 0; d < locations.data.length; d++) {
              vm.locations.push({
                id: locations.data[d]['id'],
                position: {
                  lat: locations.data[d]['lat'],
                  lng: locations.data[d]['lon']
                }
              });
            }
            vm.features = features.data;
            vm.disableButton = false;

            vm.markLocations();
            vm.recenterMap();
          }))
          .catch(e => {
            vm.errors.push(e);
          });
      },
      markLocations() {
        var mergedResponses = mergeByKey('id', this.features, this.locations);

        for (let i = 0; i < mergedResponses.length; i++) {
          this.markers.push(mergedResponses[i]);
        }
      },
      recenterMap() {
        let sumLat = this.locations.map(location => location.position.lat).reduce((total, amount) => total + amount);
        let averageLat = sumLat/this.locations.length;

        let sumLng = this.locations.map(location => location.position.lng).reduce((total, amount) => total + amount);
        let averageLng = sumLng/this.locations.length;

        this.center = { lat: averageLat, lng: averageLng };
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  *
    font-family 'Open Sans', sans-serif

  .travel-map
    height 70vh

  button
    display block
    background-color rgb(46, 150, 250)
    margin 5px auto
    width 100%
    padding 10px 20px
    border 1px outset rgba(158,219,255,0.5)
    letter-spacing 2px
    font-family 'Open Sans', sans-serif
    text-transform uppercase
    font-size 14px
    color white

  .instructions
    width 800px
    min-width 700px
    margin 0 auto

    b
      color #2e96fa
</style>
