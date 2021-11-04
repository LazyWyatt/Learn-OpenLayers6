window.onload = init;
function init() {
  const map = new ol.Map({
    view: new ol.View({
      center: [121.33913, 24.18638],
      zoom: 3,
      maxZoom: 6,
      minZoom: 2,
      rotation: 0.5
    }),
    layers: [
      new ol.layer.Tile({ 
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    keyboardEventTarget	: document, // 可以讓keyboard互動
  })
  const popupContainerElement = document.getElementById('popup-coordinates')
  const popup = new ol.Overlay({
    element: popupContainerElement, // 於指定元素,產生一個overlay
    positioning: 'center-left' // 讓跳出來的資訊在滑鼠的中間右邊
  })

  map.addOverlay(popup);


  map.on('click', function(e) {
    console.log(e)
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined); // Set the position for this overlay. If the position is undefined the overlay is hidden.
    popup.setPosition(clickedCoordinate)
    popupContainerElement.innerText = clickedCoordinate
  })

  // dragRotate Interaction
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly
  })

  map.addInteraction(dragRotateInteraction)

  const drawInteraction = new ol.interaction.Draw({
    type: 'Polygon',
    freehand: true
  })
  map.addInteraction(drawInteraction)

  // https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw.DrawEvent.html
  // 畫畫結束
  drawInteraction.on('drawend', function(e) {
    console.log('Drawing finished!')
  }) 
  drawInteraction.on('drawend', function(e) {
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeaturesObject([e.feature]);
    let drawnFeatures = parser.writeFeatures([e.feature]); //JSON
    console.log(drawnFeatures)
    console.log(drawnFeatures.features[0].geometry.coordinates[0])
  }) 
}
