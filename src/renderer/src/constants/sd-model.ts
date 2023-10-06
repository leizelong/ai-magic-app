import { stringToUnicode } from '@renderer/utils/tool'

export interface SDModelDto {
  name: string
  hash: string
  alias?: string
  // label: string
  // value: string
}

/** data from window.gradio_config.components[1].props.choices */
const modelChoices = [
  '3Guofeng3_v34.safetensors [a83e25fe5b]',
  'darkSushiMixMix_225D.safetensors [cca17b08da]',
  'ghostmix_v20Bakedvae.safetensors [e3edb8a26f]',
  'meinaalter_v3.safetensors [ecc87bab9c]',
  'meinaunreal_v41.safetensors [613844c3d2]',
  'ultraControlSupper_anythingVer.safetensors [8995e31b7a]',
  '《唯》系列炫彩动漫 _ OnlyAnime_v2 追光.safetensors [98e467c418]',
  '全网首发｜SHMILY古典炫彩_v1.0.safetensors [771bf3c3eb]',
  '动漫MeinaMix_MeinaV8.safetensors [30953ab0de]',
  '墨幽二次元_v2.safetensors [fed2531e7e]',
  '白城主2D简单mix_v2.0.safetensors [9c2dd004ad]',
  '神秘二次元标准.safetensors [cbfba64e66]'
]
// const modelChoices = [
//   'meinaunreal_v41.safetensors [613844c3d2]', // 高清good
//   'ultraControlSupper_anythingVer.safetensors [8995e31b7a]',
//   '《唯》系列炫彩动漫 _ OnlyAnime_v2 追光.safetensors [98e467c418]',
//   '全网首发｜SHMILY古典炫彩_v1.0.safetensors [771bf3c3eb]',
//   '动漫MeinaMix_MeinaV8.safetensors [30953ab0de]',
//   '墨幽二次元_v2.safetensors [fed2531e7e]',
//   '白城主2D简单mix_v2.0.safetensors [9c2dd004ad]',
//   '神秘二次元标准.safetensors [cbfba64e66]'
// ]

const choices = modelChoices.map((item) => {
  const [name, hash] = item.replace(/(.*)\.safetensors\s\[(.*)\]/, '$1,$2').split(',')
  return { name: stringToUnicode(name), hash, alias: name }
})

export const SDModelList: SDModelDto[] = [
  ...choices
  // {
  //   alias: '校园爱情风格',
  //   name: stringToUnicode('墨幽二次元_v2'),
  //   hash: 'fed2531e7e'
  // }
].map((model) => {
  return { ...model, label: model?.alias || model.name, value: model.hash }
})

