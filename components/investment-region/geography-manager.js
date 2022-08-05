import exampleRegionImg from '../../assets/images/example_region.png';

const CONTAINER_WIDTH = 1188;
const CONTAINER_HEIGHT = 999;

export const areas = [
   {
      name: 'Singapore',
      x: 280.56,
      y: 688.96,
   },
   {
      name: 'Vietnam',
      x: 315.43,
      y: 187.6,
   },
   {
      name: 'Indonesia',
      x: 516.31,
      y: 735.44,
   },
   {
      name: 'Malaysia',
      x: 207.52,
      y: 586.03,
   },
   {
      name: 'Thailand',
      x: 224.12,
      y: 317.09,
   },
   {
      name: 'Philippines',
      x: 781.93,
      y: 526.27,
   },
];

export const getContainerSize = (containerH) => {
   const containerW = containerH * (CONTAINER_WIDTH / CONTAINER_HEIGHT);
   return {
      containerW,
      containerH,
   };
};

export const getCoordinate = (x, y, containerH) => {
   if (!containerH) return { x: 0, x: 0 };
   if (x != null && y != null) {
      const containerSize = getContainerSize(containerH);
      return {
         ...containerSize,
         x: containerSize.containerW * (x / CONTAINER_WIDTH),
         y: containerSize.containerH * (y / CONTAINER_HEIGHT),
      };
   }
   return { x, y };
};

const _dummyRegionData = {
   Singapore: {
      no: '06',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
   Vietnam: {
      no: '05',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
   Indonesia: {
      no: '04',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
   Malaysia: {
      no: '03',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
   Thailand: {
      no: '02',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
   Philippines: {
      no: '01',
      address: '20 Cecil Street',
      imgUrl: exampleRegionImg,
   },
};

export const getRegionInfo = (regionName) => {
   return _dummyRegionData[regionName] || null;
};
