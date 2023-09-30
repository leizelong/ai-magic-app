import { webSocket } from 'rxjs/webSocket'
import { generateHash } from './tool'
import { lastValueFrom } from 'rxjs'

export type SDTaskChannelData = Partial<{
  // server
  msg: 'send_hash' | 'estimation' | 'send_data' | 'process_starts' | 'process_completed'
  avg_event_concurrent_process_time: number
  avg_event_process_time: number
  queue_eta: number
  queue_size: number
  rank: number
  rank_eta: number
  success: boolean
  output: {
    data: any[]
    is_generating: boolean
    // duration: 0.0030450820922851562
    // average_duration: 2.9039079666137697
  }

  // client
  fn_index: number
  session_hash: string // "5w0gu2sgf0p"
  data: any
  event_data: null
}>

export const TaskWsQueueUrl = 'ws://127.0.0.1:7860/queue/join'

export const TaggerFnIndex = 926
export const Image2ImageFnIndex = 770

interface TaggerTaskDto {
  inputPath: string
  outputPath: string
}

export function createTaggerTask(data: TaggerTaskDto) {
  return new Promise<void>((resolve, reject) => {
    const { inputPath, outputPath } = data
    const subject = webSocket<SDTaskChannelData>(TaskWsQueueUrl)
    const session_hash = generateHash('taggerTask')

    function handleSendHash() {
      subject.next({
        fn_index: TaggerFnIndex,
        session_hash
      })
    }

    function handleSendData() {
      // 变量 输入目录，输出目录
      subject.next({
        data: [
          null,
          // 'D:\\ai-workspace\\好声音第一集\\keyframes',
          inputPath,
          false,
          // 'D:\\ai-workspace\\好声音第一集\\keyframes-tagger',
          outputPath,
          '[name].[output_extension]',
          'ignore',
          false,
          false,
          'wd14-vit-v2-git',
          /** 阈值 */
          0.35,
          '',
          '',
          false,
          false,
          true,
          /** 排除项 */
          '0_0, (o)_(o), +_+, +_-, ._., <o>_<o>, <|>_<|>, =_=, >_<, 3_3, 6_9, >_o, @_@, ^_^, o_o, u_u, x_x, |_|, ||_||',
          false,
          false
        ],
        event_data: null,
        fn_index: TaggerFnIndex,
        session_hash
      })
    }

    function handleCompleteMessage(data: SDTaskChannelData) {
      // todo err 未处理
      const { data: outputData } = data.output || {}
      const resultInfo: string = outputData?.[3]
      // console.log('outputData :>> ', outputData)
      // console.log('resultInfo :>> ', resultInfo)

      if (resultInfo?.includes('input path is not a directory')) {
        reject(new Error('input path is not a directory'))
      }

      resolve()
    }

    function handleComplete() {
      // console.log('complete')
    }

    function handleError(err) {
      // console.log(err)
      reject(err)
    }

    subject.subscribe({
      next: (data) => {
        console.log('message received: ', data)
        const { msg } = data
        if (msg === 'send_hash') {
          handleSendHash()
        } else if (msg === 'send_data') {
          handleSendData()
        } else if (msg === 'process_completed') {
          handleCompleteMessage(data)
        }
      }, // Called whenever there is a message from the server.
      error: handleError, // Called if at any point WebSocket API signals some kind of error.
      complete: handleComplete // Called when connection is closed (for whatever reason).
    })
    // return lastValueFrom(subject)
  })
}

interface BatchImage2ImageTaskDto {
  inputPath: string
  outputPath: string
  promptPath: string
  /** 采样迭代步数 */
  steps?: number
  /** 重绘系数 0-1 */
  redraw?: number
  width?: number
  height?: number
  seed?: number
}

export function createBatchImage2ImageTask(data: BatchImage2ImageTaskDto) {
  return new Promise<void>((resolve, reject) => {
    const {
      inputPath,
      outputPath,
      promptPath,
      steps = 15,
      redraw = 0.5,
      width = 512,
      height = 512,
      seed = '3018052043'
    } = data

    const subject = webSocket<SDTaskChannelData>(TaskWsQueueUrl)
    const session_hash = generateHash('session')
    const taskNameHash = `task(${generateHash('taskName', 15)})`

    function handleSendHash() {
      subject.next({
        fn_index: TaggerFnIndex,
        session_hash
      })
    }

    function handleSendData() {
      // 变量 输入目录，输出目录
      // subject.next({
      //   data: [
      //     // 'task(2s2ggimcxn5cgdn)',
      //     taskNameHash,
      //     5,
      //     '',
      //     '',
      //     [],
      //     null,
      //     null,
      //     null,
      //     null,
      //     null,
      //     null,
      //     null,
      //     /** steps */
      //     // 15,
      //     steps,
      //     'DPM++ 2M Karras',
      //     4,
      //     0,
      //     'original',
      //     1,
      //     1,
      //     7,
      //     1.5,
      //     /** 重绘系数 0-1 */
      //     redraw,
      //     null,
      //     /** width */
      //     // 512,
      //     width,
      //     /** height */
      //     // 512,
      //     height,
      //     1,
      //     'Just resize',
      //     'Whole picture',
      //     32,
      //     'Inpaint masked',
      //     // 'D:\\ai-workspace\\好声音第一集\\keyframes',
      //     inputPath,
      //     // 'D:\\ai-workspace\\好声音第一集\\keyframes-output',
      //     outputPath,
      //     '',
      //     [],
      //     true,
      //     ['Prompt'],
      //     // 'D:\\ai-workspace\\好声音第一集\\keyframes-tagger',
      //     promptPath,
      //     'None',
      //     false,
      //     '',
      //     0.8,
      //     /** seed */
      //     -1,
      //     false,
      //     -1,
      //     0,
      //     0,
      //     0,
      //     false,
      //     false,
      //     'LoRA',
      //     'None',
      //     1,
      //     1,
      //     'LoRA',
      //     'None',
      //     1,
      //     1,
      //     'LoRA',
      //     'None',
      //     1,
      //     1,
      //     'LoRA',
      //     'None',
      //     1,
      //     1,
      //     'LoRA',
      //     'None',
      //     1,
      //     1,
      //     null,
      //     'Refresh models',
      //     null,
      //     null,
      //     null,
      //     '* `CFG Scale` should be 2 or lower.',
      //     true,
      //     true,
      //     '',
      //     '',
      //     true,
      //     50,
      //     true,
      //     1,
      //     0,
      //     false,
      //     4,
      //     0.5,
      //     'Linear',
      //     'None',
      //     '<p style="margin-bottom:0.75em">Recommended settings: Sampling Steps: 80-100, Sampler: Euler a, Denoising strength: 0.8</p>',
      //     128,
      //     8,
      //     ['left', 'right', 'up', 'down'],
      //     1,
      //     0.05,
      //     128,
      //     4,
      //     'fill',
      //     ['left', 'right', 'up', 'down'],
      //     false,
      //     false,
      //     'positive',
      //     'comma',
      //     0,
      //     false,
      //     false,
      //     '',
      //     '<p style="margin-bottom:0.75em">Will upscale the image by the selected scale factor; use width and height sliders to set tile size</p>',
      //     64,
      //     'None',
      //     2,
      //     'Seed',
      //     '',
      //     [],
      //     'Nothing',
      //     '',
      //     [],
      //     'Nothing',
      //     '',
      //     [],
      //     true,
      //     false,
      //     false,
      //     false,
      //     0,
      //     false,
      //     true,
      //     0.5,
      //     true,
      //     null,
      //     null,
      //     false,
      //     null,
      //     null,
      //     false,
      //     null,
      //     null,
      //     false,
      //     50,
      //     [],
      //     '',
      //     '',
      //     ''
      //   ],
      //   event_data: null,
      //   fn_index: Image2ImageFnIndex,
      //   session_hash
      // })

      subject.next({
        data: [
          taskNameHash,
          5,
          '',
          '',
          [],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          // 15,
          steps,
          'DPM++ 2M Karras',
          4,
          0,
          'original',
          1,
          1,
          7,
          1.5,
          // 0.63,
          redraw,
          null,
          width,
          height,
          1,
          'Just resize',
          'Whole picture',
          32,
          'Inpaint masked',
          // 'D:\\ai-workspace\\好声音第一集\\keyframes',
          // 'D:\\ai-workspace\\好声音第一集\\keyframes-output',
          inputPath,
          outputPath,
          '',
          [],
          true,
          ['Prompt'],
          // 'D:\\ai-workspace\\好声音第一集\\keyframes-tagger',
          promptPath,
          'None',
          false,
          '',
          0.8,
          // 3018052043,
          seed,
          false,
          -1,
          0,
          0,
          0,
          false,
          false,
          'LoRA',
          'None',
          1,
          1,
          'LoRA',
          'None',
          1,
          1,
          'LoRA',
          'None',
          1,
          1,
          'LoRA',
          'None',
          1,
          1,
          'LoRA',
          'None',
          1,
          1,
          null,
          'Refresh models',
          null,
          null,
          null,
          '* `CFG Scale` should be 2 or lower.',
          true,
          true,
          '',
          '',
          true,
          50,
          true,
          1,
          0,
          false,
          4,
          0.5,
          'Linear',
          'None',
          '<p style="margin-bottom:0.75em">Recommended settings: Sampling Steps: 80-100, Sampler: Euler a, Denoising strength: 0.8</p>',
          128,
          8,
          ['left', 'right', 'up', 'down'],
          1,
          0.05,
          128,
          4,
          'fill',
          ['left', 'right', 'up', 'down'],
          false,
          false,
          'positive',
          'comma',
          0,
          false,
          false,
          '',
          '<p style="margin-bottom:0.75em">Will upscale the image by the selected scale factor; use width and height sliders to set tile size</p>',
          64,
          'None',
          2,
          'Seed',
          '',
          [],
          'Nothing',
          '',
          [],
          'Nothing',
          '',
          [],
          true,
          false,
          false,
          false,
          0,
          false,
          true,
          0.5,
          true,
          null,
          null,
          false,
          null,
          null,
          false,
          null,
          null,
          false,
          50,
          [],
          `{"prompt": "", "all_prompts": [""], "negative_prompt": "", "all_negative_prompts": [""], "seed": ${seed}, "all_seeds": [${seed}], "subseed": -1, "all_subseeds": [1227057145], "subseed_strength": 0, "width": ${width}, "height": ${height}, "sampler_name": "DPM++ 2M Karras", "cfg_scale": 7.0, "steps": ${steps}, "batch_size": 1, "restore_faces": false, "face_restoration_model": null, "sd_model_name": "\\u58a8\\u5e7d\\u4e8c\\u6b21\\u5143_v2", "sd_model_hash": "fed2531e7e", "sd_vae_name": null, "sd_vae_hash": null, "seed_resize_from_w": -1, "seed_resize_from_h": -1, "denoising_strength": ${redraw}, "extra_generation_params": {}, "index_of_first_image": 0, "infotexts": [""], "styles": [], "job_timestamp": "20230930212143", "clip_skip": 2, "is_using_inpainting_conditioning": false}',
          '<p></p>`,

          `<p class='comments'></p><div class='performance'><p class='time'>Time taken: <wbr><span class='measurement'>36.9 sec.</span></p><p class='vram'><abbr title='Active: peak amount of video memory used during generation (excluding cached data)'>A</abbr>: <span class='measurement'>1.77 GB</span>, <wbr><abbr title='Reserved: total amout of video memory allocated by the Torch library '>R</abbr>: <span class='measurement'>2.75 GB</span>, <wbr><abbr title='System: peak amout of video memory allocated by all running programs, out of total capacity'>Sys</abbr>: <span class='measurement'>4.2/6 GB</span> (70.5%)</p></div>`
        ],
        event_data: null,
        fn_index: Image2ImageFnIndex,
        session_hash
      })
    }

    function handleCompleteMessage(data: SDTaskChannelData) {
      // todo err 未处理
      const { data: outputData } = data.output || {}
      const resultInfo: string = outputData?.[3]
      // console.log('outputData :>> ', outputData)
      // console.log('resultInfo :>> ', resultInfo)

      // if (resultInfo?.includes('input path is not a directory')) {
      //   reject(new Error('input path is not a directory'))
      // }

      resolve()
    }

    function handleComplete() {}

    function handleError(err) {
      reject(err)
    }

    subject.subscribe({
      next: (data) => {
        console.log('message received: ', data)
        const { msg } = data
        if (msg === 'send_hash') {
          handleSendHash()
        } else if (msg === 'send_data') {
          handleSendData()
        } else if (msg === 'process_completed') {
          handleCompleteMessage(data)
        }
      }, // Called whenever there is a message from the server.
      error: handleError, // Called if at any point WebSocket API signals some kind of error.
      complete: handleComplete // Called when connection is closed (for whatever reason).
    })
    // return lastValueFrom(subject)
  })
}
