import React, { useEffect, useState } from 'react'
import { Image, ImageProps } from 'antd'
import { Blob } from 'buffer'
import { fileToUrl, readFile } from '@renderer/utils/tool'

// const { Blob } = require('buffer');

export interface LocalImageProps extends Omit<ImageProps, 'src'> {
  filePath?: string
}

export function LocalImage(props: LocalImageProps) {
  const { filePath, ...rest } = props
  const [url, setUrl] = useState('')
  useEffect(() => {
    async function fetchUrl() {
      if (!filePath) return
      const localUrl = await fileToUrl(filePath)
      setUrl(localUrl)
    }
    fetchUrl()
  }, [filePath])
  return <Image src={url} {...rest}></Image>
}
