
import { reactive} from 'vue';


export function useCxtjMap() {
  // const { getApiBody } = useSearch();
  const state = reactive({
    data: [] as any[],
  });

  async function fetchData3D() {
    try {
      const data:any  = [{
        receiveTime: 1743559522000,
        lightningType: 1,
        latitude: 40.812,
        longitude: 111.654,
        peakCurrentIntensity: 125.3
      },{
        receiveTime: 1743559522000,
        lightningType: 0,
        latitude: 39.9042,
        longitude: 116.4074,
        peakCurrentIntensity: 125.3
      },{
        receiveTime: 1743559522000,
        lightningType: 0,
        latitude: 23.07,
        longitude: 113.15,
        peakCurrentIntensity: 125.3
      },{
         },{
        receiveTime: 1743559522000,
        lightningType: 1,
        latitude: 38.53,
        longitude: 121.34,
        peakCurrentIntensity: 125.3
      },{
        receiveTime: 1743559522000,
        lightningType: 0,
        latitude: 34.16,
        longitude: 108.56,
        peakCurrentIntensity: 125.3
      }];
      state.data = data.map((item:any) => ({
        ...item,
      }));
    } catch (error) {}
  }
  function search3D() {
    fetchData3D();
  }
  return { state, search3D };
}
