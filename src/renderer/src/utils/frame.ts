export type FrameResult = {
  frames: FrameDto[]
}

export interface FrameDto {
  /** 帧类型 */
  pict_type: 'I' | 'P' | 'B'
  /** 是否关键帧 */
  key_frame: 1 | 0
  /**  帧的类型（视频、音频、字幕等） */
  media_type: string
  /** Frame包的pts的时间显示 */
  pkt_dts_time: string
}
