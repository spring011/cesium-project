<template>
  <div id="cesiumContainer"></div>
  <thunderLenged
    :thunderData="thunderData"
    :thunderTotal="thunderTotal"
    :selectTimeInterval="selectTimeInterval"
    @changeSelect="changeSelect"
  ></thunderLenged>
  <div id="thunderInfo"></div>
</template>
<script lang="ts" setup>
import thunderLenged from './ThunderLenged.vue';
import { formatDate } from '@/utils/utils';
import dayjs from 'dayjs';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import {
  addPrimitive,
  clearBillboard,
  destroyCesium,
  flyToAddress,
  initBillboard,
  initCesium,
} from './mapS';

let viewer: any;
let isLoadData: boolean = false;
interface thunderData {
  startTime: number;
  endTime: number;
  time: string;
  plus_ground: number;
  minus_ground: number;
  cloud: number;
}
interface thunderTotal {
  plus_ground: number;
  minus_ground: number;
  cloud: number;
  total: number;
}
const color = [
  '#d60000',
  '#ff9000',
  '#ffff00',
  '#00d800',
  '#00ecec',
  '#01a0f6',
  '#7a048b',
  '#e45ef7',
  '#ff8001',
  '#feff38',
  '#a5562b',
  '#999999',
];
const props = defineProps(['data', 'searchState']);
const selectTimeInterval = ref<number[]>([]);
const thunderTotal = ref<thunderTotal>({
  plus_ground: 0,
  minus_ground: 0,
  cloud: 0,
  total: 0,
});
const thunderData = ref<thunderData[]>([]);

function changeSelect(v: number) {
  clearBillboard();
  thunderData.value = [];
  thunderTotal.value = {
    plus_ground: 0,
    minus_ground: 0,
    cloud: 0,
    total: 0,
  };
  console.log(props.searchState);
  console.log(props.data);
  // if (props.data && props.data.data?.length > 0) {
  //   const _time = Math.ceil(
  //     (props.searchState.timeRange[1] - props.searchState.timeRange[0]) / 1000 / 3600 / v,
  //   );

  //   for (let i = 0; i < _time; i++) {
  //     const time1 = props.searchState.timeRange[0] + v * i * 3600 * 1000;
  //     const time2 = props.searchState.timeRange[0] + v * (i + 1) * 3600 * 1000;
  //     thunderData.value.push({
  //       startTime: time1,
  //       endTime: time2,
  //       time: `${formatDate(new Date(time1), 'HH:mm')}-${formatDate(new Date(time2), 'HH:mm')}`,
  //       plus_ground: 0,
  //       minus_ground: 0,
  //       cloud: 0,
  //     });
  //   }

  //   formMapData(props.data.data);
  // }
  if (props.data && props.data.data?.length > 0) {
    // const _time = Math.ceil(
    //   (props.searchState.timeRange[1] - props.searchState.timeRange[0]) / 1000 / 3600 / v,
    // );
    //改为固定分段
    const _time = Math.ceil(24 / v);
    console.log(_time);
    for (let i = 0; i < _time; i++) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 设置小时、分钟、秒和毫秒

      // const time1 = props.searchState.timeRange[0] + v * i * 3600 * 1000;
      // const time2 = props.searchState.timeRange[0] + v * (i + 1) * 3600 * 1000;

      const time1 = today.getTime() + v * i * 3600 * 1000;
      let time2 = today.getTime() + v * (i + 1) * 3600 * 1000;

      //设定最后一组数字为23.59
      if (i == _time - 1) {
        time2 = time2 - 1;
        thunderData.value.unshift({
          startTime: time1,
          endTime: time2,
          time: `${formatDate(new Date(time1), 'HH:mm:ss')}-${formatDate(new Date(time2), '23:59:59')}`,
          plus_ground: 0,
          minus_ground: 0,
          cloud: 0,
        });
      } else {
        thunderData.value.unshift({
          startTime: time1,
          endTime: time2,
          time: `${formatDate(new Date(time1), 'HH:mm:ss')}-${formatDate(new Date(time2), 'HH:mm:ss')}`,
          plus_ground: 0,
          minus_ground: 0,
          cloud: 0,
        });
      }
    }

    thunderData.value = thunderData.value.reverse();
    thunderData.value[3].cloud = 3;
    thunderData.value[3].plus_ground=2;
    thunderData.value[2].cloud = 0;
    thunderData.value[2].plus_ground=0;
    console.log('thunderData=>111', thunderData.value);

    formMapData(props.data.data);
  } else {
    console.log('没数据');

    formMapData([]);
  }
}
function timeStringToTimestamp(timeString: string): number {
  const today = new Date();
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
    seconds,
  ).getTime();
}
// 格式化数据
// 0正地闪, 1负地闪, 2云闪

function formMapData(n: any) {
  let arr: any = [],
    arr2: any = [];
  thunderTotal.value.total = n.length;
  clearBillboard();
  n.forEach((el: any, i: number) => {
    // debugger
    // 数据统计
    for (let j = 0; j < thunderData.value.length; j++) {
      const itemTimeStr = thunderData.value[j].time.split('-');
      const elTime = timeStringToTimestamp(dayjs(el.flashTime).format('HH:mm:ss'));
      const startitemTime = timeStringToTimestamp(itemTimeStr[0]);
      const enditemTime = timeStringToTimestamp(itemTimeStr[1]);
      if (startitemTime < elTime && elTime <= enditemTime) {
        if (el.lightningType == 0) {//云闪
          // thunderData.value[j].cloud += 1;
          thunderTotal.value.cloud += 1;
          arr2.push({
            type: 'Feature',
            properties: {
              color: color[j],
              type: 'circle',
              id: i,
              ...el,
            },
            geometry: {
              type: 'Point',
              coordinates: [el.longitude, el.latitude],
            },
          });

          addPrimitive({
            color: color[j],
            type: 'circle',
            id: i,
            ...el,
          });
        } else if (el.lightningType == 1) {//地闪
          if (el.peakCurrentIntensity > 0) {
            // thunderData.value[j].plus_ground += 1;
            thunderTotal.value.plus_ground += 1;
            arr.push({
              type: 'Feature',
              properties: {
                id: i,
                color: color[j],
                name: '加',
                type: 'plus',
                ...el,
              },
              geometry: {
                type: 'Point',
                coordinates: [el.longitude, el.latitude],
              },
            });

            addPrimitive({
              id: i,
              color: color[j],
              name: '加',
              type: 'plus',
              ...el,
            });
          }
          if (el.peakCurrentIntensity <= 0) {
            thunderData.value[j].minus_ground += 1;
            thunderTotal.value.minus_ground += 1;
            arr.push({
              type: 'Feature',
              properties: {
                id: i,
                color: color[j],
                name: '减',
                type: 'minus',
                ...el,
              },
              geometry: {
                type: 'Point',
                coordinates: [el.longitude, el.latitude],
              },
            });
            addPrimitive({
              id: i,
              color: color[j],
              name: '减',
              type: 'minus',
              ...el,
            });
          }
        }
        break;
      }
    }
  });

  isLoadData = true;
}

function searchFun() {
  if (props.searchState.county) {
    // flyToAddress(props.searchState.county);
    return;
  } else if (props.searchState.city) {
    // flyToAddress(props.searchState.city);
    return;
  } else if (props.searchState.province) {
    flyToAddress(props.searchState.province);
    return;
  }
}

watch(
  () => props.data,
  () => {

    if (props.searchState.timeRange[1] - props.searchState.timeRange[0] < 3600 * 13 * 1000) {
      selectTimeInterval.value = [2, 3, 5];
    } else if (props.searchState.timeRange[1] - props.searchState.timeRange[0] < 3600 * 19 * 1000) {
      selectTimeInterval.value = [3, 4, 5, 6, 12];
    } else {
      selectTimeInterval.value = [6, 12, 24];
    }
    selectTimeInterval.value = [6, 12, 24];

    viewer && changeSelect(selectTimeInterval.value[0]);
  },
  { immediate: true, deep: true },
);
defineExpose({
  searchFun,
});

onMounted(() => {
  initCesium().then((res) => {
    viewer = res;
    initBillboard();
    if (!isLoadData) {
      changeSelect(selectTimeInterval.value[0]);
    }
  });
});
onBeforeUnmount(() => {
  destroyCesium();
});
</script>
<style lang="scss">
#thunderInfo {
  display: none;
  position: absolute;
  transform: scale(0.7);
  .thunder-popup.keep-px {
    max-width: 440px;
    background: #fff;
    border-radius: 4px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    padding: 6px 12px;
    font-size: 12px;
    div {
      width: 100%;
      margin-bottom: 4px;
      &.w-100 {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
