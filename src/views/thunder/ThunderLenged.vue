<template>
  <div class="lenged-wrapper keep-px">
    <div class="lenged keep-px">
      <div>图例</div>
      <div><span class="symbol">+</span>正地闪</div>
      <div><span class="symbol" style="padding-left:2px">-</span>负地闪</div>
      <div><span class="symbol circle"></span>云闪</div>
      <div v-if="dataType === 'thunder'"><span class="symbol thunder"></span>卫星</div>
      <div v-if="dataType === 'new'" class="flex items-center" style="position: relative;left:-2px"><span class="symbol thunder"style="margin-right: 8px;"></span>最新数据</div>
    </div>
    <div class="lenged-search keep-px">
      <div class="row">
        <div>
          时间间隔：
          <select v-model="selectValue" @change="changeSelect">
            <option v-for="item in selectTimeInterval" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>时间单位：小时 数量单位：个</div>
      </div>
      <div class="row">
        <div class="col col-center">
          <div class="col-head">颜色</div>
          <div class="lenged-color">
            <div
              v-for="(item, index) in thunderData"
              :key="item.time"
              :style="{ background: sectionColor[index] }"
            ></div>
          </div>
        </div>
        <div class="col col-center">
          <div class="col-head">时间段</div>
          <div class="col-data">
            <div v-for="item in thunderData">{{ item.time }}</div>
          </div>
          <div class="total">总数</div>
        </div>
        <div class="col col-center">
          <div class="col-head">正地闪</div>
          <div class="col-data">
            <div v-for="item in thunderData">{{ item.plus_ground }}</div>
          </div>
          <div class="total">{{ thunderTotal.plus_ground }}</div>
        </div>
        <div class="col col-center">
          <div class="col-head">负地闪</div>
          <div class="col-data">
            <div v-for="item in thunderData">{{ item.minus_ground }}</div>
          </div>
          <div class="total">{{ thunderTotal.minus_ground }}</div>
        </div>
        <div class="col col-center">
          <div class="col-head">云闪</div>
          <div class="col-data">
            <div v-for="item in thunderData">{{ item.cloud }}</div>
          </div>
          <div class="total">{{ thunderTotal.cloud }}</div>
        </div>
        <div class="col col-center" v-if="dataType === 'thunder'">
          <div class="col-head">卫星</div>
          <div class="col-data">
            <div v-for="item in thunderData">{{ item.thunder }}</div>
          </div>
          <div class="total">{{ thunderTotal.thunder }}</div>
        </div>
        <div class="col col-center">
          <div class="col-head">数量</div>
          <div class="col-data">
            <template v-if="dataType === 'thunder'">
              <div v-for="item in thunderData">
                {{ item.plus_ground + item.minus_ground + item.cloud }}
                <!-- {{ item.plus_ground + item.minus_ground + item.cloud + item.thunder }} -->
              </div>
            </template>
            <template v-else>
              <div v-for="item in thunderData">
                {{ item.plus_ground + item.minus_ground + item.cloud }}
              </div>
            </template>
          </div>
          <!-- <div class="total">{{ thunderTotal.total }}</div> -->
          <div class="total">
            {{ thunderTotal.plus_ground + thunderTotal.minus_ground + thunderTotal.cloud }}
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

const sectionColor = ref([
  'green',
  '#9933cc',
  'red',
  'yellow',
  '#00ecec',
  '#01a0f6',
  '#7a048b',
  '#e45ef7',
  '#ff8001',
  '#feff38',
  '#a5562b',
  '#999999',
]);

const selectValue = ref<number>(0);
const props = defineProps(['thunderData', 'thunderTotal', 'selectTimeInterval', 'dataType']);
const emits = defineEmits(['changeSelect']);

function changeSelect() {
  emits('changeSelect', selectValue.value);
}
onMounted(() => {
  // changeSelect();
});

watch(
  () => props.selectTimeInterval,
  (n) => {
    if (!selectValue.value) {
      console.log(n);
      selectValue.value = n[0];
    }
  },
);
watch(
  () => props.thunderTotal.total,
  (n) => {
    console.log(n);
    selectValue.value = props.selectTimeInterval[0];
  },
);
</script>
<style lang="scss" scoped>
.lenged-wrapper.keep-px {
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 484px;
  transform: translate(-142px);
  z-index: 10;
  display: flex;
}
$lenged-search-width: 368px;
.lenged.keep-px {
  width: 115px;
  font-size: 16px;
  box-sizing: border-box;
  color: #fff;
  line-height: 22px;
  border: 2px solid #0a7199;
  padding: 5px;
  background: linear-gradient(0deg, rgba(7, 40, 53, 0.23), rgba(27, 152, 189, 0.23));
  min-height: 130px;
  .symbol {
    display: inline-block;
    width: 12px;
    margin-right: 10px;
    &.circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
    }
    &.thunder {
      width: 15px;
      height: 15px;
      background: url(@/images/thunder.png) no-repeat;
      background-size: 100% 100%;
      position: relative;
      top: 2px;
    }
  }
}
.lenged-search.keep-px {
  width: $lenged-search-width;
  // height: 148px;
  box-sizing: border-box;
  background: linear-gradient(0deg, rgba(7, 40, 53, 0.23), rgba(27, 152, 189, 0.23));
  border: 2px solid #0a7199;
  color: #fff;
  font-size: 16px;
  padding: 10px 10px 0 10px;
  min-height: 130px;
  .row {
    display: flex;
    font-size: 14px;
    margin-bottom: 6px;
    justify-content: space-between;
  }
  select {
    outline: none;
    background: rgba(27, 152, 189, 0.23);
    color: #fff;
    border: none;
    width: 60px;
    height: 18px;
    line-height: 18px;
  }
  .col {
    display: flex;
    font-size: 12px;
    flex-direction: column;
    .col-head {
      font-size: 14px;
      margin-bottom: 4px;
    }
    .col-data {
      div {
        margin-bottom: 0.6px;
      }
    }
  }
  .col-center {
    align-items: center;
  }
  .lenged-color {
    div {
      width: 27px;
      height: 12px;
    }
  }
}
</style>
