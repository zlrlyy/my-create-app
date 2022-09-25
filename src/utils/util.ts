import cookie from 'js-cookie';
import getConfig from 'next/config';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

// 转化obj的key和value
export const keyToValue = (obj: Record<string, number | string>) => {
  const res: Record<string, number | string> = {};
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in obj) {
    res[obj[key]] = key;
  }
  return res;
};

// 清楚登录cookie
export function removeUserCookies() {
  cookie.remove('YD_ADVERTISE_PALTFORM_USER');
}

//增加cdn前缀
export function formatAssetUrl(url: string) {
  if (!STATIC_ASSETS_URL) return url;
  return STATIC_ASSETS_URL + url;
}

interface LoaderParms {
  src: string;
  width: number;
  quality?: number;
}
// 转圈
export const myNextImgLoader = (params: LoaderParms) =>
  `${params.src}?w=${params.width}&q=${params.quality || 100}`;

// 获取父级容器
export const getParentContainer = (
  triggerNode: HTMLElement | null,
  lever = 1,
) => {
  while (triggerNode && lever-- > 0) {
    triggerNode = triggerNode.parentElement;
  }
  return triggerNode || document.body;
};
