import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/XYZ';
import BingMaps from 'ol/source/BingMaps';

export class FacadeOL {
    constructor(id_map='map', coordinates_center=[-4331024.58685793, -1976355.8033415168], a_zoom_value = 4, a_baseLayer_name='OSM' ) {

      this.map = new Map({ target: id_map});
      this.view = new View({ center: coordinates_center, zoom: a_zoom_value});
      this.map.setView(this.view);
      this.currentBaseLayer = this.osmBaseLayer();
      this.map.addLayer(this.currentBaseLayer);
    }

    nullBaseLayer() {
      return null
    }
    osmBaseLayer() {
        return new TileLayer({ source: new XYZ({url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'}), zIndex: 0 })
    }
    googleBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'}), zIndex: 0})
    }
    sateliteBaseLayer() {

      return new TileLayer({visible: false, preload: Infinity, source: new BingMaps({ key:'As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5', imagerySet: 'Aerial'}), zIndex: 0})
    }
    watercolorBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'http://{a-c}.tile.stamen.com/watercolor/{z}/{x}/{y}.png'}), zIndex: 0})
    }
    wikimediaBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'}), zIndex: 0})
    }


    baseLayer(a_baseLayer_name) {
      // name: 'Wikimedia', value: 'wikimedia'}, {name: 'Nenhum', value: null}]
        const layers = {
          'OSM': this.osmBaseLayer(),
          'google': this.googleBaseLayer() ,
          'satelite': this.sateliteBaseLayer(),
          'watercolor': this.watercolorBaseLayer(),
          'wikimedia': this.wikimediaBaseLayer(),
          null: this.nullBaseLayer()
        }
      return layers[a_baseLayer_name]
    }
    setBaseLayer(a_baseLayer_name) {

      this.map.removeLayer(this.currentBaseLayer)
      if (!a_baseLayer_name)
        return
      this.currentBaseLayer = this.baseLayer(a_baseLayer_name)
      this.map.addLayer(this.currentBaseLayer)
    }

}
