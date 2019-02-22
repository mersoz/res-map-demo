<script>
import { LINE_PATH_CONFIG } from "../constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
    // (:options="infoOptions" :position="infoPosition" :opened="infoOpened", :content="infoContent", @closeclick="infoOpened=false")
  },
  data() {
    return {
      contentString: "hellooooooooo"
    }
  },

  mounted() {
    // const { InfoWindow } = this.google.maps;
    // new InfoWindow({
    //   content: this.marker
    //   // marker: this.marker,
    //   // map: this.map,
    //   // icon: POINT_MARKER_ICON_CONFIG,
    //   // label: String(this.marker.id)
    // });
    // console.log(this.marker);

  },

  render() {},
};
</script>
