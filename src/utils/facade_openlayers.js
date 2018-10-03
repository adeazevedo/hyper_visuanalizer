import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/XYZ'
import TileImage from 'ol/source/TileImage'
import ImageLayer from 'ol/layer/Image'
import ImageWMS from 'ol/source/ImageWMS'
import WMSCapabilities from 'ol/format/WMSCapabilities'
import {transformExtent} from 'ol/proj'
import Stroke from 'ol/style/Stroke'
import Graticule from 'ol/Graticule'
export class WMSLayer {
  constructor(ogcWMSLayer, wms_version, wms_online_resource, layer_was_requested=false) {
    this.name = ogcWMSLayer.Name
    this.title = ogcWMSLayer.Title
    this.metadata = ogcWMSLayer.MetadataURL
    this.version = wms_version
    this.entryPoint = wms_online_resource
    this.was_requested = layer_was_requested
    this.crsName= ogcWMSLayer.CRS[0] // NÃO ESTÁ FUNCIONANDO PARA EPSG:4674 => FORÇADO PARA 'EPSG:4326'
    let extent = ogcWMSLayer.EX_GeographicBoundingBox
    let bbox = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
    this.bbox = bbox
    this.olLayer = null
  }
}

export class FacadeOL {
    constructor(id_map='map', coordinates_center=[-4331024.58685793, -1976355.8033415168], a_zoom_value = 4, a_baseLayer_name='OSM' ) {
      this.map = new Map({ target: id_map});
      this.view = new View({ center: coordinates_center, zoom: a_zoom_value});
      this.map.setView(this.view);
      this.currentBaseLayer = this.osmBaseLayer();
      this.map.addLayer(this.currentBaseLayer);

    }
    // Begins - These operations are related to the baselayer
    //return a null base layer
    nullBaseLayer() {
      return null
    }
    //returns a OSM TileLayer as baselayer
    osmBaseLayer() {
        return new TileLayer({ source: new XYZ({url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'}), zIndex: 0 })
    }
    //returns a google TileLayer as baselayer
    googleBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'}), zIndex: 0})
    }
    //returns a google satelite TileLayer as baselayer
    sateliteBaseLayer() {
      return new TileLayer({source: new TileImage({ url: 'http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}'}), zIndex: 0})
    }
    //returns a water TileLayer as baselayer
    watercolorBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'http://{a-c}.tile.stamen.com/watercolor/{z}/{x}/{y}.png'}), zIndex: 0})
    }
    //returns wikimedia TileLayer as baselayer
    wikimediaBaseLayer() {
      return new TileLayer({source: new XYZ({url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'}), zIndex: 0})
    }
    //returns a TileLayer based on name(a_baseLayer_name) or null
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
    // Ends - These operations above are related to the baselayer
    // Begins - These operations are related to the WMS
    normalizedUrlWMSCapabilities(url) {
      let id = url.toUpperCase().indexOf('GetCapabilities'.toUpperCase())
      if (id == -1)
        return url + '?service=wms&request=GetCapabilities'
      return url
    }
    getWMSCapabilitiesAsJSON(resquestedXml) {
      let  parser = new WMSCapabilities()
      return parser.read(resquestedXml)
    }
    getWMSLayers(requestedXml) {
      let capability_json = this.getWMSCapabilitiesAsJSON(requestedXml)
      let layers = capability_json.Capability.Layer.Layer
      return layers.map((a_layer) => new WMSLayer(a_layer, capability_json.version, capability_json.Service.OnlineResource))
    }
    getWMSMap(wmsLayer) {
      console.log(wmsLayer);
      let wmsSource = new ImageWMS({url: wmsLayer.entryPoint +'/wms', params: {'LAYERS': wmsLayer.name}})
      return new ImageLayer({extent: wmsLayer.bbox, source: wmsSource})
    }
    addWMSLayer(wmsLayer) {
      let image_layer = this.getWMSMap(wmsLayer)
      this.map.addLayer(image_layer)
      wmsLayer.olLayer = image_layer
      return wmsLayer
    }
    removeWMSLayer(wmsLayer) {
      this.map.removeLayer(wmsLayer.olLayer)
      wmsLayer.olLayer = null
    }
    // End - These operations above are related to the WMS
    //
    showGraticule(color='rgba(255,120,0,0.9)', width=2, lineDash=[0.5, 4], showLabels=true) {
      let strokeStyle = new Stroke({ color: color, width: width, lineDash: lineDash })
      let graticule = new Graticule({ strokeStyle: strokeStyle, showLabels: showLabels})
      graticule.setMap(this.map)
    }

    //
}
