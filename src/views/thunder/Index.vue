<template>
<div class="container">
    <div>
      <cesiumThunderMap :searchState="searchState" :data="mapdata"></cesiumThunderMap>
    </div>
</div>
</template>
<script setup lang="ts">
  import cesiumThunderMap from '@/views/thunder/thunder.vue';
  import { onMounted,reactive } from 'vue';
  import dayjs from 'dayjs';
  import { useCxtjMap } from '@/hooks/useCxtj';

  export interface SearchState {
  timeRange: [number, number];
  cloCateMeth: number | null;
  classification: number | null;
  qcCodeType: number | null;
  qcCode: number | null;
  networkType: number | null;
  province: string | undefined | null;
  city: string | undefined | null;
  county: string | undefined | null;
  maxIntensity: number | undefined | null;
  minIntensity: number | undefined | null;
  // stationType: any;
}
  const searchState = reactive<SearchState>({
    timeRange: [dayjs().startOf('day').valueOf(), dayjs().valueOf()],
    cloCateMeth: null,
    classification: null,
    qcCodeType: 1,
    qcCode: 0,
    networkType: null, // 0 网内, 1 网外
    province: null,
    city: null,
    county: null,
    maxIntensity: null,
    minIntensity: null,
    // stationType: null,
  });

  const { search3D: getMapData, state: mapdata } = useCxtjMap();
  console.log(mapdata)
  
  onMounted(() => {
    getMapData();
  })

</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  max-width: none;
}
</style>