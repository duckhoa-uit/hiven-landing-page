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

export const getCoordinate = (x, y, containerH) => {
   if (!containerH) return { x: 0, x: 0 };
   if (x != null && y != null) {
      const containerW = containerH * (CONTAINER_WIDTH / CONTAINER_HEIGHT);
      return {
         x: containerW * (x / CONTAINER_WIDTH),
         y: containerH * (y / CONTAINER_HEIGHT),
      };
   }
   return { x, y };
};
