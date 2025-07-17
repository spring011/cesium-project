// @ts-nocheck
let viewer;
export function initViewer() {
  viewer = new Cesium.Viewer('cesiumContainer', {
    shouldAnimate: true,
    // animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    // timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    // terrainProvider:terrainProvider
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      // url: `${import.meta.env.VITE_BASE_baseCESIUMMAPURL}/lixianditu/map/L{_z}/{_y}/{_x}.png`, //服务地址
     url: 'https://{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=816517e17d1cc31c6eec03ef9fc4bb5b',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      maximumLevel: 18,
      minimumLevel: 1,
      credit: 'Tianditu'
    }),
  });
  viewer.timeline.container.style.visibility = 'hidden';
  viewer.animation.container.style.visibility = 'hidden';
  viewer.cesiumWidget.creditContainer.style.display = 'none';
  viewer.scene.globe.depthTestAgainsTerrain = true;
  // 是否支持图像渲染像素化处理
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
  viewer.scene.postProcessStages.fxaa.enable = true;

  maxHeightCesium();
  initView();
  changeOperationHabit();
  return viewer;
}
//限定最大缩放高度
function maxHeightCesium() {
  var camera = viewer.scene.camera;
  var currentZoomDistance = getCameraDistanceToCenter(camera);
  // 定义最大和最小的缩放距离
  var minimumZoomDistance = 0.0; // 单位：米
  var maximumZoomDistance = 15700000.0; // 单位：米

  // 创建ScreenSpaceEventHandler来监听滚轮事件
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

  // 监听滚轮事件
  handler.setInputAction(function (movement) {
    var zoomDirection = movement < 0 ? 1 : -1;
    var currentZoomDistance = getCameraDistanceToCenter(camera);
    // console.log(zoomDirection);
    // console.log(currentZoomDistance);
    // 计算新的缩放距离
    var newZoomDistance = currentZoomDistance * (1 + 0.01 * zoomDirection);

    // 检查新距离是否超出限制

    if (newZoomDistance <= maximumZoomDistance) {
    } else {
      camera.moveForward(3618762.348956557);
    }
  }, Cesium.ScreenSpaceEventType.WHEEL);
}

// 获取相机到地球中心的距离
function getCameraDistanceToCenter(camera) {
  var positionWC = camera.positionWC;
  var distanceToCenter = Cesium.Cartesian3.magnitude(positionWC);
  return distanceToCenter;
}
// 初始化cesium罗盘
export function initCompass() {
  let options = {};
  // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
  // options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
  options.defaultResetView = Cesium.Cartographic.fromDegrees(103.84, 31.15, 17850000);
  // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
  options.enableCompass = true;
  // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
  options.enableZoomControls = true;
  // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  options.enableDistanceLegend = true;
  // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
  options.enableCompassOuterRing = true;

  CesiumNavigation.umd(viewer, options);
}

//防止视角进入地下
export function initView() {
  let mousePosition, startMousePosition;
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (movement) {
    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
    handler.setInputAction(function (movement) {
      mousePosition = movement.endPosition;
      let y = mousePosition.y - startMousePosition.y;
      if (y > 0) {
        viewer.scene.screenSpaceCameraController.enableTilt = true;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);
}

// 更改操作习惯
export function changeOperationHabit() {
  viewer.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.RIGHT_DRAG,
    Cesium.CameraEventType.PINCH,
    {
      eventType: Cesium.CameraEventType.LEFT_DRAG,
      modifier: Cesium.KeyboardEventModifier.CTRL,
    },
    {
      eventType: Cesium.CameraEventType.RIGHT_DRAG,
      modifier: Cesium.KeyboardEventModifier.CTRL,
    },
  ];
  viewer.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.MIDDLE_DRAG,
    Cesium.CameraEventType.WHEEL,
    Cesium.CameraEventType.PINCH,
  ];
}
