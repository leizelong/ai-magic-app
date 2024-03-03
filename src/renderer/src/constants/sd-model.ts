import { stringToUnicode } from '@renderer/utils/tool'

export interface SDModelDto {
  name: string
  hash: string
  alias?: string
  label: string
  value: string
}

/** data from window.gradio_config.components[1].props.choices */

const models = [
  {
    model: '墨幽二次元_v2.safetensors [fed2531e7e]',
    alias: '动漫风格'
  },
  {
    model: '3Guofeng3_v34.safetensors [a83e25fe5b]'
  },
  {
    model: 'darkSushiMixMix_225D.safetensors [cca17b08da]'
  },
  {
    model: 'ghostmix_v20Bakedvae.safetensors [e3edb8a26f]'
  },
  {
    model: 'meinaalter_v3.safetensors [ecc87bab9c]'
  },
  {
    model: 'meinaunreal_v41.safetensors [613844c3d2]'
  },
  {
    model: 'ultraControlSupper_anythingVer.safetensors [8995e31b7a]'
  },
  {
    model: '《唯》系列炫彩动漫 _ OnlyAnime_v2 追光.safetensors [98e467c418]'
  },
  {
    model: '全网首发｜SHMILY古典炫彩_v1.0.safetensors [771bf3c3eb]'
  },
  {
    model: '动漫MeinaMix_MeinaV8.safetensors [30953ab0de]'
  },

  {
    model: '白城主2D简单mix_v2.0.safetensors [9c2dd004ad]'
  },
  {
    model: '神秘二次元标准.safetensors [cbfba64e66]'
  }
]

export const SDModelList: SDModelDto[] = models.map((item) => {
  const { model, alias } = item
  const [name, hash] = model.replace(/(.*)\.safetensors\s\[(.*)\]/, '$1,$2').split(',')
  return { name: name, hash, value: hash, label: alias || name }
})

// export const SDModelList: SDModelDto[] = [
//   ...choices

// ].map((model) => {
//   return { ...model, label: model?.alias || model.name, value: model.hash }
// })

console.log('SDModelList :>> ', SDModelList)
