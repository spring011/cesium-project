// @ts-nocheck
import circleImage from '@/images/circle-white.png';
import minusImage from '@/images/minus-white.png';
import plusImage from '@/images/plus-white.png';
import chinaJson from './china.json';
import { initViewer } from './baseMap';

let sdswStore = {detailObj: {}}

let viewer, camera;
export function initCesium() {
  viewer = initViewer();
  return flyToChina();
}
function flyToChina() {
  return new Promise((resolve, reject) => {
    camera = viewer.camera;
    // 将三维球定位到中国
    // viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 8000000),
    //   orientation: {
    //     heading: Cesium.Math.toRadians(348.4202942851978),
    //     pitch: Cesium.Math.toRadians(-89.74026687972041),
    //     roll: Cesium.Math.toRadians(0),
    //   },
    //   complete: () => {
    //     initAdministrativeDivision();
    //     resolve(viewer);
    //   },
    // });
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(113.84, 15.15, 1000000),
      orientation: {
        heading: Cesium.Math.toRadians(348.4202942851978),
        pitch: Cesium.Math.toRadians(-35.74026687972041),
        roll: Cesium.Math.toRadians(0),
      },
      complete: () => {
        initAdministrativeDivision();
        resolve(viewer);
      },
    });
  });
}
const cityLoLaList = [
  {
    province: '北京市',
    center: {
      latitude: 39.9042,
      longitude: 116.4074,
    },
  },
  {
    province: '天津市',
    center: {
      latitude: 39.0851,
      longitude: (117.2).jpg,
    },
  },
  {
    province: '河北省',
    center: {
      latitude: 38.0454,
      longitude: 114.5084,
    },
  },
  {
    province: '山西省',
    center: {
      latitude: 37.8706,
      longitude: 112.5628,
    },
  },
  {
    province: '内蒙古自治区',
    center: {
      latitude: 40.8183,
      longitude: 111.6503,
    },
  },
  {
    province: '辽宁省',
    center: {
      latitude: 41.8056,
      longitude: 123.4313,
    },
  },
  {
    province: '吉林省',
    center: {
      latitude: 43.8868,
      longitude: 125.3245,
    },
  },
  {
    province: '黑龙江省',
    center: {
      latitude: 45.7569,
      longitude: 126.6424,
    },
  },
  {
    province: '上海市',
    center: {
      latitude: 31.2304,
      longitude: 121.4737,
    },
  },
  {
    province: '江苏省',
    center: {
      latitude: 32.0611,
      longitude: 118.7874,
    },
  },
  {
    province: '浙江省',
    center: {
      latitude: 30.2971,
      longitude: 120.1535,
    },
  },
  {
    province: '安徽省',
    center: {
      latitude: 31.8611,
      longitude: 117.2811,
    },
  },
  {
    province: '福建省',
    center: {
      latitude: 26.0753,
      longitude: 119.2964,
    },
  },
  {
    province: '江西省',
    center: {
      latitude: 28.6764,
      longitude: 115.8921,
    },
  },
  {
    province: '山东省',
    center: {
      latitude: 36.6757,
      longitude: 117.0203,
    },
  },
  {
    province: '河南省',
    center: {
      latitude: 34.766,
      longitude: 113.654,
    },
  },
  {
    province: '湖北省',
    center: {
      latitude: 30.5833,
      longitude: 114.3112,
    },
  },
  {
    province: '湖南省',
    center: {
      latitude: 28.1127,
      longitude: 112.9823,
    },
  },
  {
    province: '广东省',
    center: {
      latitude: 23.1323,
      longitude: 113.2644,
    },
  },
  {
    province: '广西壮族自治区',
    center: {
      latitude: 22.8212,
      longitude: 108.3206,
    },
  },
  {
    province: '海南省',
    center: {
      latitude: 20.0319,
      longitude: 110.3822,
    },
  },
  {
    province: '重庆市',
    center: {
      latitude: 29.563,
      longitude: 106.5515,
    },
  },
  {
    province: '四川省',
    center: {
      latitude: 30.6594,
      longitude: 104.0657,
    },
  },
  {
    province: '贵州省',
    center: {
      latitude: 26.5783,
      longitude: 106.7134,
    },
  },
  {
    province: '云南省',
    center: {
      latitude: 25.04,
      longitude: 102.7122,
    },
  },
  {
    province: '西藏自治区',
    center: {
      latitude: 29.65,
      longitude: 91.1167,
    },
  },
  {
    province: '陕西省',
    center: {
      latitude: 34.2634,
      longitude: 108.95,
    },
  },
  {
    province: '甘肃省',
    center: {
      latitude: 36.0594,
      longitude: 103.8263,
    },
  },
  {
    province: '青海省',
    center: {
      latitude: 36.62,
      longitude: 101.7767,
    },
  },
  {
    province: '宁夏回族自治区',
    center: {
      latitude: 38.47,
      longitude: 106.27,
    },
  },
  {
    province: '新疆维吾尔自治区',
    center: {
      latitude: 43.7928,
      longitude: 87.6277,
    },
  },
  {
    province: '香港特别行政区',
    center: {
      latitude: 22.3964,
      longitude: 114.1095,
    },
  },
  {
    province: '澳门特别行政区',
    center: {
      latitude: 22.1987,
      longitude: 113.5438,
    },
  },
];
// 将三维球定位到任意地址
export function flyToAddress(thisCity) {
  return new Promise((resolve, reject) => {
    let cityLoLa = null;
    cityLoLaList.forEach((l) => {
      if (l.province === thisCity) {
        cityLoLa = l.center;
      }
    });
    console.log(cityLoLa);

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(cityLoLa.longitude, cityLoLa.latitude, 1300000),
      orientation: {
        heading: Cesium.Math.toRadians(348.4202942851978),
        pitch: Cesium.Math.toRadians(-89.74026687972041),
        roll: Cesium.Math.toRadians(0),
      },
      complete: () => {
        // removeFill(viewer);
        //特殊上色
        initAdministrativeDivisionCity(thisCity);

        resolve(viewer);
      },
    });
  });
}

export function destroyCesium() {
  if (viewer) {
    if (viewer.entities) {
      viewer.entities.removeAll();
    }
    viewer.destroy();
  }
  window.cesiumLayer && (window.cesiumLayer = null);
}

// 行政区划
// chinaJson
function initAdministrativeDivision() {
  const res = Cesium.GeoJsonDataSource.load(chinaJson, {
    stroke: Cesium.Color.WHITE,
    fill: Cesium.Color.BLUE.withAlpha(0),
    strokeWidth: 5,
  });
  viewer.dataSources.add(res);
}
// 行政区划 单独城市
function initAdministrativeDivisionCity(thisCity) {
  let cityList = [];
  chinaJson.features.forEach((itemCity) => {
    if (itemCity.properties.name === thisCity) {
      cityList.push(itemCity);
    }
  });
  console.log(cityList);
  let cityJson = { type: 'FeatureCollection', features: cityList };
  console.log(cityJson);

  const cityFillRes = Cesium.GeoJsonDataSource.load(cityJson, {
    stroke: Cesium.Color.fromCssColorString('red'),
    fill: Cesium.Color.fromCssColorString('rgba(255, 127, 0, 0.2)'),
    strokeWidth: 5,
  });

  cityFillRes.then((dataSource) => {
    viewer.dataSources.add(dataSource);
    const currentDataSource = dataSource;
    console.log(currentDataSource);
    console.log(viewer.dataSources);
    viewer.dataSources._dataSources.forEach((dataSourceItem) => {
      if (dataSourceItem !== currentDataSource) {
        dataSourceItem.entities.values.forEach((entity) => {
          if (entity.polygon) {
            entity.polygon.material = Cesium.Color.TRANSPARENT;
          }
        });
      }
    });
  });
}
function removeFill(thisViewer) {
  const dataSource = thisViewer.dataSources.get(0);
  console.log(thisViewer.dataSources);
  if (dataSource) {
    dataSource.entities.values.forEach((entity) => {
      if (entity.polygon) {
        // 将实体的填充颜色设置为完全透明
        entity.polygon.material = Cesium.Color.TRANSPARENT;
      }
    });
  }
  // console.log('222222');
  // const res = Cesium.GeoJsonDataSource.load(chinaJsonList, {

  //   fill: Cesium.Color.fromCssColorString('rgba(0, 0, 0, 0)'),
  //   strokeWidth: 1,
  // });
  // viewer.dataSources.add(res);
}
export function zoomIn(n) {
  camera.zoomIn(n);
}
export function zoomOut(n) {
  camera.zoomOut(n);
}

//添加单个图标点
let billboards;
let billboardInfo = [];
export function initBillboard() {
  billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection());
  bindModelEvent();
}
let base = 4;
export function addPrimitive(properties) {
  billboardInfo.push(properties);

  let m = Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(properties.longitude, properties.latitude)),
    new Cesium.Cartesian3(0, 0, 0),
    new Cesium.Matrix4());

 // 创建一个圆柱体几何体
  let cylinderGeometry = new Cesium.CylinderGeometry({
      length : base * 20000,
      topRadius : 6000,
      bottomRadius : 6000,
  });
 
    // 创建一个圆柱体实体
  let cylinder = viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances : new Cesium.GeometryInstance({
          geometry : cylinderGeometry,
          modelMatrix: m
      }),
      appearance :  new Cesium.MaterialAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Color',
            uniforms: {
              color: Cesium.Color.fromBytes(20, 200, 212, 200),
            }
          }
        }),
        faceForward: true
      }),
  }));

  billboards.add({
    name: 'thunder',
    color: Cesium.Color.fromCssColorString(properties.color),
    scale: 0.6,
    position: Cesium.Cartesian3.fromDegrees(
      properties.longitude,
      properties.latitude,
      base * 10000,
    ),
    image:
      properties.type === 'plus'
        ? plusImage
        : properties.type === 'minus'
          ? minusImage
          : circleImage,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  });
  base = base + 1;
}
export function clearBillboard() {
  billboardInfo = [];
  billboards.removeAll();
}

let timeHover = true;

export function bindModelEvent() {
  const thunderInfo = document.querySelector('#thunderInfo');
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(async function onMouseMove(movement) {
    const pick = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pick)) {
      thunderInfo.style.display = 'none';
      timeHover = true;
      return;
    }
    const _info = billboardInfo[pick.primitive._index];

    if (_info) {
      //防抖请求
      if (timeHover) {
        timeHover = false;
        let cachedResult;
        if (!sdswStore.detailObj[_info.id]) {
          // let { data: cachedResult } = await getPonitsId(_info.id, _info.flashTime);
          // const { data } = await getPonitsId(_info.id, _info.flashTime);
          const data = {cloCateMeth: '2'}
          cachedResult = data;
          sdswStore.detailObj[_info.id] = cachedResult;
        } else {
          cachedResult = sdswStore.detailObj[_info.id];
        }
        // 定位信息字段
        let cloCateMethMethod = cachedResult.cloCateMeth;
        let cloCateMethText;
        if (cloCateMethMethod == '1') {
          cloCateMethText = '两站定位';
        } else if (cloCateMethMethod == '2') {
          cloCateMethText = '三站定位';
        } else if (cloCateMethMethod == '3') {
          cloCateMethText = '四站定位';
        } else if (cloCateMethMethod == '4') {
          cloCateMethText = '四站以上定位 ';
        } else {
          // 处理未知情况
          cloCateMethText = cachedResult.cloCateMeth;
        }
        // 数据标识字段过滤
        let flashTag = cachedResult.flashTag;
        let flashTagText;
        if (flashTag == 0) {
          flashTagText = '云闪';
        } else if (flashTag == 1) {
          flashTagText = '地闪';
        } else {
          // 处理未知情况
          flashTagText = cachedResult.flashTag;
        }
        // 设备类型字段过滤
        let deviceType = cachedResult.deviceType;
        let deviceTypeText;
        if (deviceType == 0) {
          deviceTypeText = 'ADTD';
        } else if (deviceType == 1) {
          deviceTypeText = 'DDW1';
        } else if (deviceType == 3) {
          deviceTypeText = 'VLF';
        } else {
          // 处理未知情况
          deviceTypeText = cachedResult.cloCateMeth;
        }

        const nowData: { [key: string]: any } = {};
        for (const key in cachedResult) {
          const value = (cachedResult as { [key: string]: any })[key];
          if (value === null) {
            nowData[key] = '-';
          } else {
            nowData[key] = value;
          }
        }

        const description = `
            <div class="thunder-popup keep-px">
              <div class="thunder-popup keep-px">
              <div>定位方式：${cloCateMethText}</div>
              <div class="w-100">雷电时间：2025.2.3</div>
              <div>高度质控码：1</div>
              <div>电流质控码：2</div>
              <div>纬度质控码：1</div>
              <div>经度质控码：1</div>
              <div>物理相关性质控码：1</div>
              <div>时空约束质控码：1</div>
              <div>时间质控码：2</div>
              <div>最终质控码：2</div>
            </div>
            `;
        thunderInfo.innerHTML = description;
        thunderInfo.style.display = 'block';
        let _top = 0;
        if (movement.endPosition.y + 150 < thunderInfo.offsetHeight) {
          _top = movement.endPosition.y + 26;
          thunderInfo.classList.add('bottom');
        } else {
          _top = movement.endPosition.y - thunderInfo.offsetHeight - 26;
          thunderInfo.classList.remove('bottom');
        }
        thunderInfo.style.top = `${_top}px`;
        thunderInfo.style.left = `${movement.endPosition.x - 106}px`;
      } else {
      }
    } else {
      thunderInfo.style.display = 'none';
      timeHover = false;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
