import {transformExtent} from 'ol/proj'
export class OptionsLayer {

  constructor(supportedProperties, supportedOperations, context,  iriTemplate) {
    this.supporte_properties = supportedProperties;
    this.supported_operations = supportedOperations.sort((a,b) => a['hydra:operation'] < b['hydra:operation'] ? -1 : 1);
    this.context = context;
    this.iri_template = iriTemplate;
  }
}
class AbstractLayerResource {
  constructor(layer, iri, name) {
    this.layer = layer
    this.iri = iri
    this.name = this.nameOrNameFromURL(name, iri)
    this.activated = true
  }
  nameOrNameFromURL(name, url) {
    if(name)
      return name
    let arr_url = url.split('/');
    let size_arr = arr_url.length;
    if (arr_url[size_arr-1] == "")
      return arr_url[size_arr-2].toUpperCase();
    return arr_url[size_arr-1].toUpperCase();
  }
}

export class GeoHyperLayerResource extends AbstractLayerResource {
}

export class WMSLayer extends AbstractLayerResource {

  constructor(layerFromGetCapability,wms_version, wms_online_resource) {
    if (layerFromGetCapability != null) {
      super(null,layerFromGetCapability.url, layerFromGetCapability.Name)
      this.name = layerFromGetCapability.Name
      this.title = layerFromGetCapability.Title
      this.metadata = layerFromGetCapability.MetadataURL
      this.version = wms_version
      this.entryPoint = wms_online_resource
      this.was_requested = false
      this.crsName= layerFromGetCapability.CRS[0] // NÃO ESTÁ FUNCIONANDO PARA EPSG:4674 => FORÇADO PARA 'EPSG:4326'
      let extent = layerFromGetCapability.EX_GeographicBoundingBox
      let bbox = transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
      this.bbox = bbox
      this.layer = null
    }

    else {
      this.json = null;
      this.url = null;
      this.options_response = null;
      this.vector_layer = null;
      this.options_layer = [];
    }
  }

   short_name() {
    let arr_url = this.url.split('/');
    let size_arr = arr_url.length;
    if (arr_url[size_arr-1] == "")
      return arr_url[size_arr-2].toUpperCase();
    return arr_url[size_arr-1].toUpperCase();
  }

}
