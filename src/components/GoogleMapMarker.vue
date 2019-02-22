<script>
import { POINT_MARKER_ICON_CONFIG } from "../constants/mapSettings";

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
  },
  mounted() {
    var vm = this;
    const { Marker } = vm.google.maps;
    var marker = new Marker({
      position: vm.marker.position,
      marker: vm.marker,
      map: vm.map,
      icon: POINT_MARKER_ICON_CONFIG,
      label: String(vm.marker.id)
    });

    var infowindow =  new google.maps.InfoWindow({
      content: `
        <div class="infoWindowContents">
          ${vm.marker.Bathrooms} bed/${vm.marker.Bathrooms} bath</br>
          Price: £${vm.marker.price}</br>
          Size: ${vm.marker.sqrm} m<sup>2</sup></br>
          Garden: ${vm.marker.garden}
        </div>
        <img src="https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBVYiwPWVIsYzgHS8zlxv16XwJbOpEUmjI&size=400x200&location=${vm.marker.position.lat},${vm.marker.position.lng}"/>
      `,
      map: vm.map,
      position: vm.marker.position
    });
    infowindow.close(vm.map, this);

    vm.google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(vm.map, this);
    })
    // vm.google.maps.event.addListener(marker, 'mouseout', function() {
    // 	infowindow.close();
    // });
    vm.google.maps.event.addListener(vm.map, 'click', function() {
    	infowindow.close();
    });
  },

  render() {}
};
</script>
