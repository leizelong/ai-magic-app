export interface SDModelDto {
  name: string
  hash: string
  alias?: string
  label: string
  value: string
}

/**  window.gradio_config.components[1].props.choices.map((item) => ({ model: item })) */

const dataFrom = [
  '3Guofeng3_v34.safetensors [a83e25fe5b]',
  'darkSushiMixMix_225D.safetensors [cca17b08da]',
  'Ekmix-gen3.ckpt',
  'ghostmix_v20Bakedvae.safetensors [e3edb8a26f]',
  'LahMysteriousSDXL_v40.safetensors [da5ddce194]',
  'majicmixHorror_v1.safetensors',
  'meinaalter_v3.safetensors [ecc87bab9c]',
  'meinapastel_v6Pastel.safetensors',
  'meinaunreal_v41.safetensors [613844c3d2]',
  'ultraControlSupper_anythingVer.safetensors [8995e31b7a]',
  '《唯》系列炫彩动漫 _ OnlyAnime_v2 追光.safetensors [98e467c418]',
  '全网首发｜SHMILY古典炫彩_v1.0.safetensors [771bf3c3eb]',
  '动漫MeinaMix_MeinaV8.safetensors [30953ab0de]',
  '墨幽二次元_v2.safetensors [fed2531e7e]',
  '白城主2D简单mix_v2.0.safetensors [9c2dd004ad]',
  '神秘二次元标准.safetensors [cbfba64e66]'
].map((item) => ({ model: item }))

const models = [
  {
    model: '[知识创客]小说推文专用模型[高精度版]V1_[高精度版]V1.safetensors [73a40de25e]'
  },
  {
    model: '3Guofeng3_v34.safetensors [a83e25fe5b]'
  },

  {
    model: 'darkSushiMixMix_225D.safetensors [cca17b08da]'
  },
  {
    model: 'Ekmix-gen3.ckpt'
  },
  {
    model: 'ghostmix_v20Bakedvae.safetensors [e3edb8a26f]'
  },
  {
    model: 'LahMysteriousSDXL_v40.safetensors [da5ddce194]'
  },
  {
    model: 'majicmixHorror_v1.safetensors'
  },
  {
    model: 'meinaalter_v3.safetensors [ecc87bab9c]'
  },
  {
    model: 'meinapastel_v6Pastel.safetensors'
  },
  {
    model: 'meinaunreal_v41.safetensors [613844c3d2]'
  },
  {
    model: 'niji-动漫二次元_3.0.safetensors [0674a540ce]'
  },
  {
    model: 'revAnimated_v122EOL.safetensors [4199bcdd14]'
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
    model: '墨幽二次元_v2.safetensors [fed2531e7e]'
  },
  {
    model: '白城主2D简单mix_v2.0.safetensors [9c2dd004ad]'
  }
]

export const SDModelList: SDModelDto[] = models.map((item) => {
  const { model, alias } = item
  const [name, hash] = model.replace(/(.*)\.safetensors\s\[(.*)\]/, '$1,$2').split(',')
  return { name: name, hash, value: hash, label: alias || name }
})

console.log('SDModelList :>> ', SDModelList)
