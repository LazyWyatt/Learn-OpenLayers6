var map = new ol.Map({
  target: 'map', //id的value
  layers: [ // 可用的layers，加上tiled layer(平面地圖)
    // layer被用來定義一個類別(Image,Tile,Vector)裡面包含一個source
    // source是一個protocol(協議)被用來拿到map tiles(地圖圖塊)
    new ol.layer.Tile({ 
      source: new ol.source.OSM()
    })
  ],
  // view被用來定義有關畫面，可以被用來指定center(中心點),resolution(解析度),
  // rotation(傾斜角度)，最基本的是指定center和zoom level。
  view: new ol.View({
    center: ol.proj.fromLonLat([122.5, 22.5]),
    zoom: 4 // 0表示zoom out
  })
  // Since the only layer we use is in Spherical Mercator projection (EPSG:3857), we can reproject them 
  // on the fly to be able to zoom the map on the right coordinates.
})
