import { writeJsonConfigToFile } from './file'
import { DraftKeyFrameDto } from './frame'
import { path } from './module'
import { generateUUID } from './tool'
import cloneDeep from 'lodash/cloneDeep'
// 2.1 draft_content.json => draft_content.json.back, template-2.tmp

const DraftContentConfig = {
  canvas_config: { height: 1440, ratio: 'original', width: 1920 },
  color_space: 0,
  config: {
    adjust_max_index: 1,
    attachment_info: [],
    combination_max_index: 1,
    export_range: null,
    extract_audio_last_index: 1,
    lyrics_recognition_id: '',
    lyrics_sync: true,
    lyrics_taskinfo: [],
    maintrack_adsorb: true,
    material_save_mode: 0,
    original_sound_last_index: 1,
    record_audio_last_index: 1,
    sticker_max_index: 1,
    subtitle_recognition_id: '',
    subtitle_sync: true,
    subtitle_taskinfo: [],
    system_font_list: [],
    video_mute: false,
    zoom_info_params: null
  },
  cover: null,
  create_time: 0,
  // totalDuration
  duration: 2500000,
  extra_info: null,
  fps: 30.0,
  free_render_index_mode_on: false,
  group_container: null,
  id: 'AB41FBC1-A5D0-49fd-8DEA-20F7D735307D',
  // id: draftContentId,
  keyframe_graph_list: [],
  keyframes: {
    adjusts: [],
    audios: [],
    effects: [],
    filters: [],
    handwrites: [],
    stickers: [],
    texts: [],
    videos: []
  },
  last_modified_platform: {
    app_id: 3704,
    app_source: 'lv',
    app_version: '4.6.1',
    device_id: '8ef7079c65aa7f192394020b21458ffa',
    hard_disk_id: 'ad274937e2058d697a2b7411456593a9',
    mac_address: '7dc3c9bc0676b0eb890c2d97bbf0d8f9',
    os: 'windows',
    os_version: '10.0.22000'
  },
  materials: {
    audio_balances: [],
    audio_effects: [],
    audio_fades: [],
    audios: [],
    beats: [],
    canvases: [
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: '22309524-F417-40a9-84BA-63F016549DC0',
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      },
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: '6104DDA2-8BFB-4c7b-8362-E66B8CE40D98',
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      },
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: '82B2A9CB-2CCB-4118-9015-3B6192879997',
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      },
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: 'C69E087B-401E-4731-BF9B-EFE4F0746712',
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      },
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: '8DC61328-DA45-4fc1-832E-DBCB936BA1E1',
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      }
    ],
    chromas: [],
    color_curves: [],
    digital_humans: [],
    drafts: [],
    effects: [],
    flowers: [],
    green_screens: [],
    handwrites: [],
    hsl: [],
    images: [],
    log_color_wheels: [],
    loudnesses: [],
    manual_deformations: [],
    masks: [],
    material_animations: [],
    material_colors: [],
    placeholders: [],
    plugin_effects: [],
    primary_color_wheels: [],
    realtime_denoises: [],
    shapes: [],
    smart_crops: [],
    sound_channel_mappings: [
      {
        audio_channel_mapping: 0,
        id: '76B4DB89-1122-4bb5-AE61-D25245EA3086',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '557AE5BA-DDB5-4e10-A439-D0019C3B3B81',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '18E413D5-8A29-46c4-8C46-0A752E7F1D59',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '12135FF3-463C-4f31-BC0D-D85E77A243B3',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '8CA48BD7-E0A9-4b36-A91B-E022059F63FF',
        is_config_open: false,
        type: ''
      }
    ],
    speeds: [
      {
        curve_speed: null,
        id: '6F496FD8-0272-411f-B369-C102827F553D',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '33985D85-F604-42f6-88CE-C8DE60BC9C16',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '2B86063B-6304-45f1-A0B0-D807902C1994',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '687DA9B1-F8E1-4b9e-8F9F-9953C4649712',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '24A0C5B9-B330-4709-A123-E7DA933641B7',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      }
    ],
    stickers: [],
    tail_leaders: [],
    text_templates: [],
    texts: [],
    transitions: [],
    video_effects: [],
    video_trackings: [],
    videos: [
      {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: '19FF636A-DA62-46d0-9F05-7AC748FF3BDC',
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        material_name: '00001-7850995639.png',
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00001-7850995639.png',
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      },
      {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: 'CFBD82D1-3E83-4aa8-AFEB-5AC3348FFA90',
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        material_name: '00002-7850995639.png',
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00002-7850995639.png',
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      },
      {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: '4ABAD563-9EE3-4724-AD01-20CA23502E67',
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        material_name: '00003-7850995639.png',
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00003-7850995639.png',
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      },
      {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: '214966AC-1BD9-45d1-8352-3B7DBF8BA2F4',
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        material_name: '00004-7850995639.png',
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00004-7850995639.png',
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      },
      {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: 'CD063794-389C-4124-95D3-9BA8863A65C7',
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        material_name: '00005-7850995639.png',
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00005-7850995639.png',
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      }
    ],
    vocal_separations: [
      {
        choice: 0,
        id: 'A0CC2A8C-76F7-49af-85FE-371E2D21F662',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: 'CD2414EC-52DD-4f41-A4FA-023A2B37025D',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: 'FFB0C438-C3D5-48ef-87EB-A37B57732CA4',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: 'CBC5573C-EEA9-48ee-B85F-39C400BA649C',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: '9A7EB349-F10E-4a7a-8BE3-EFEC166451AC',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      }
    ]
  },
  mutable_config: null,
  name: '',
  new_version: '83.0.0',
  platform: {
    app_id: 3704,
    app_source: 'lv',
    app_version: '4.6.1',
    device_id: '8ef7079c65aa7f192394020b21458ffa',
    hard_disk_id: 'ad274937e2058d697a2b7411456593a9',
    mac_address: '7dc3c9bc0676b0eb890c2d97bbf0d8f9',
    os: 'windows',
    os_version: '10.0.22000'
  },
  relationships: [],
  render_index_track_mode_on: false,
  retouch_cover: null,
  source: 'default',
  static_cover_image_path: '',
  tracks: [
    {
      attribute: 0,
      flag: 0,
      id: '1CF7CD61-A442-47ee-9374-D7534A189804',
      is_default_name: true,
      name: '',
      segments: [
        {
          cartoon: false,
          clip: {
            alpha: 1.0,
            flip: { horizontal: false, vertical: false },
            rotation: 0.0,
            scale: { x: 1.0, y: 1.0 },
            transform: { x: 0.0, y: 0.0 }
          },
          common_keyframes: [],
          enable_adjust: true,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: true,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '6F496FD8-0272-411f-B369-C102827F553D',
            '22309524-F417-40a9-84BA-63F016549DC0',
            '76B4DB89-1122-4bb5-AE61-D25245EA3086',
            'A0CC2A8C-76F7-49af-85FE-371E2D21F662'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '8C05D33D-CCC9-4c0c-B0E5-5A1D6869CAED',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '19FF636A-DA62-46d0-9F05-7AC748FF3BDC',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 5000000, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 5000000, start: 0 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: { on: true, value: 1.0 },
          visible: true,
          volume: 1.0
        },
        {
          cartoon: false,
          clip: {
            alpha: 1.0,
            flip: { horizontal: false, vertical: false },
            rotation: 0.0,
            scale: { x: 1.0, y: 1.0 },
            transform: { x: 0.0, y: 0.0 }
          },
          common_keyframes: [],
          enable_adjust: true,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: true,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '33985D85-F604-42f6-88CE-C8DE60BC9C16',
            '6104DDA2-8BFB-4c7b-8362-E66B8CE40D98',
            '557AE5BA-DDB5-4e10-A439-D0019C3B3B81',
            'CD2414EC-52DD-4f41-A4FA-023A2B37025D'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '76047720-221B-4cdd-8DD5-BFC450897AC9',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: 'CFBD82D1-3E83-4aa8-AFEB-5AC3348FFA90',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 5000000, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 5000000, start: 5000000 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: { on: true, value: 1.0 },
          visible: true,
          volume: 1.0
        },
        {
          cartoon: false,
          clip: {
            alpha: 1.0,
            flip: { horizontal: false, vertical: false },
            rotation: 0.0,
            scale: { x: 1.0, y: 1.0 },
            transform: { x: 0.0, y: 0.0 }
          },
          common_keyframes: [],
          enable_adjust: true,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: true,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '2B86063B-6304-45f1-A0B0-D807902C1994',
            '82B2A9CB-2CCB-4118-9015-3B6192879997',
            '18E413D5-8A29-46c4-8C46-0A752E7F1D59',
            'FFB0C438-C3D5-48ef-87EB-A37B57732CA4'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '0BC310CF-CC9C-4322-8B67-E87F5B1E51BF',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '4ABAD563-9EE3-4724-AD01-20CA23502E67',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 5000000, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 5000000, start: 10000000 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: { on: true, value: 1.0 },
          visible: true,
          volume: 1.0
        },
        {
          cartoon: false,
          clip: {
            alpha: 1.0,
            flip: { horizontal: false, vertical: false },
            rotation: 0.0,
            scale: { x: 1.0, y: 1.0 },
            transform: { x: 0.0, y: 0.0 }
          },
          common_keyframes: [],
          enable_adjust: true,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: true,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '687DA9B1-F8E1-4b9e-8F9F-9953C4649712',
            'C69E087B-401E-4731-BF9B-EFE4F0746712',
            '12135FF3-463C-4f31-BC0D-D85E77A243B3',
            'CBC5573C-EEA9-48ee-B85F-39C400BA649C'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '7F1A5015-29F1-4930-8BC8-73577BECB8F1',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '214966AC-1BD9-45d1-8352-3B7DBF8BA2F4',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 5000000, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 5000000, start: 15000000 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: { on: true, value: 1.0 },
          visible: true,
          volume: 1.0
        },
        {
          cartoon: false,
          clip: {
            alpha: 1.0,
            flip: { horizontal: false, vertical: false },
            rotation: 0.0,
            scale: { x: 1.0, y: 1.0 },
            transform: { x: 0.0, y: 0.0 }
          },
          common_keyframes: [],
          enable_adjust: true,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: true,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '24A0C5B9-B330-4709-A123-E7DA933641B7',
            '8DC61328-DA45-4fc1-832E-DBCB936BA1E1',
            '8CA48BD7-E0A9-4b36-A91B-E022059F63FF',
            '9A7EB349-F10E-4a7a-8BE3-EFEC166451AC'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '725080C2-A2ED-4bb9-ACB6-80FCC0B9485A',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: 'CD063794-389C-4124-95D3-9BA8863A65C7',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 5000000, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 5000000, start: 20000000 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: { on: true, value: 1.0 },
          visible: true,
          volume: 1.0
        }
      ],
      type: 'video'
    }
  ],
  update_time: 0,
  version: 360000
}

interface GenerateDraftContentDto {
  keyFrameList: DraftKeyFrameDto[]
  draftProjectDir: string
  videoInfo: {
    duration: number
  }
}

/** draft_content.json => draft_content.json.back, template-2.tmp */
export function generateDraftContent(data: GenerateDraftContentDto) {
  const { keyFrameList, draftProjectDir, videoInfo } = data

  const totalDuration = videoInfo.duration
  const draftContentId = generateUUID()

  function completeConfig(baseConfig: typeof DraftContentConfig) {
    const config: typeof DraftContentConfig = cloneDeep(baseConfig)
    config.duration = totalDuration
    config.id = draftContentId
    // 1. speeds
    const speeds = keyFrameList.map(() => {
      const speedId = generateUUID()
      return {
        curve_speed: null,
        id: speedId,
        mode: 0,
        speed: 1.0,
        type: 'speed'
      }
    })
    config.materials.speeds = speeds

    // 2. canvases
    const canvases = keyFrameList.map(() => {
      const canvasId = generateUUID()
      return {
        album_image: '',
        blur: 0.0,
        color: '',
        id: canvasId,
        image: '',
        image_id: '',
        image_name: '',
        source_platform: 0,
        team_id: '',
        type: 'canvas_color'
      }
    })
    config.materials.canvases = canvases

    // 3. sound_channel_mappings
    const sound_channel_mappings = keyFrameList.map(() => {
      const audioId = generateUUID()
      return {
        audio_channel_mapping: 0,
        id: audioId,
        is_config_open: false,
        type: ''
      }
    })
    config.materials.sound_channel_mappings = sound_channel_mappings

    // 4. vocal_separations
    const vocal_separations = keyFrameList.map(() => {
      const separationId = generateUUID()
      return {
        choice: 0,
        id: separationId,
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      }
    })

    config.materials.vocal_separations = vocal_separations

    // 5. videos

    const videos = keyFrameList.map((keyFrame) => {
      const videoId = generateUUID()
      const { fileName: keyFrameMaterialName, filePath: keyFrameMaterialPath } = keyFrame

      return {
        aigc_type: 'none',
        audio_fade: null,
        cartoon_path: '',
        category_id: '',
        category_name: 'local',
        check_flag: 63487,
        crop: {
          lower_left_x: 0.0,
          lower_left_y: 1.0,
          lower_right_x: 1.0,
          lower_right_y: 1.0,
          upper_left_x: 0.0,
          upper_left_y: 0.0,
          upper_right_x: 1.0,
          upper_right_y: 0.0
        },
        crop_ratio: 'free',
        crop_scale: 1.0,
        duration: 10800000000,
        extra_type_option: 0,
        formula_id: '',
        freeze: null,
        gameplay: null,
        has_audio: false,
        height: 1080,
        id: videoId,
        intensifies_audio_path: '',
        intensifies_path: '',
        is_ai_generate_content: false,
        is_unified_beauty_mode: false,
        local_id: '',
        local_material_id: '',
        material_id: '',
        // material_name: '00001-7850995639.png',
        material_name: keyFrameMaterialName,
        material_url: '',
        matting: {
          flag: 0,
          has_use_quick_brush: false,
          has_use_quick_eraser: false,
          interactiveTime: [],
          path: '',
          strokes: []
        },
        media_path: '',
        object_locked: null,
        origin_material_id: '',
        // path: 'D:/ai-workspace/好声音第一集/keyframes-upscale/00001-7850995639.png',
        path: keyFrameMaterialPath,
        picture_from: 'none',
        picture_set_category_id: '',
        picture_set_category_name: '',
        request_id: '',
        reverse_intensifies_path: '',
        reverse_path: '',
        smart_motion: null,
        source: 0,
        source_platform: 0,
        stable: null,
        team_id: '',
        type: 'photo',
        video_algorithm: {
          algorithms: [],
          deflicker: null,
          motion_blur_config: null,
          noise_reduction: null,
          path: '',
          quality_enhance: null,
          time_range: null
        },
        width: 1440
      }
    })
    config.materials.videos = videos

    // segments => video => tracks

    // 1. segments
    const segments = keyFrameList.map((keyFrame, index) => {
      const segmentId = generateUUID()
      const speedMaterialRef = speeds[index]
      const canvasMaterialRef = canvases[index]
      const soundMaterialRef = sound_channel_mappings[index]
      const separationMaterialRef = vocal_separations[index]
      const videoMaterialRef = videos[index]

      const { duration: keyFrameDuration, start: keyFrameStart } = keyFrame

      return {
        cartoon: false,
        clip: {
          alpha: 1.0,
          flip: { horizontal: false, vertical: false },
          rotation: 0.0,
          scale: { x: 1.0, y: 1.0 },
          transform: { x: 0.0, y: 0.0 }
        },
        common_keyframes: [],
        enable_adjust: true,
        enable_color_curves: true,
        enable_color_wheels: true,
        enable_lut: true,
        enable_smart_color_adjust: false,
        extra_material_refs: [
          // '6F496FD8-0272-411f-B369-C102827F553D',
          // '22309524-F417-40a9-84BA-63F016549DC0',
          // '76B4DB89-1122-4bb5-AE61-D25245EA3086',
          // 'A0CC2A8C-76F7-49af-85FE-371E2D21F662'
          speedMaterialRef.id,
          canvasMaterialRef.id,
          soundMaterialRef.id,
          separationMaterialRef.id
        ],
        group_id: '',
        hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
        id: segmentId,
        intensifies_audio: false,
        is_placeholder: false,
        is_tone_modify: false,
        keyframe_refs: [],
        last_nonzero_volume: 1.0,
        // material_id: '19FF636A-DA62-46d0-9F05-7AC748FF3BDC',
        material_id: videoMaterialRef.id,
        render_index: 0,
        responsive_layout: {
          enable: false,
          horizontal_pos_layout: 0,
          size_layout: 0,
          target_follow: '',
          vertical_pos_layout: 0
        },
        reverse: false,
        source_timerange: { duration: keyFrameDuration, start: 0 },
        speed: 1.0,
        target_timerange: { duration: keyFrameDuration, start: keyFrameStart },
        template_id: '',
        template_scene: 'default',
        track_attribute: 0,
        track_render_index: 0,
        uniform_scale: { on: true, value: 1.0 },
        visible: true,
        volume: 1.0
      }
    })

    // 2. track video item
    const trackVideoId = generateUUID()
    const trackVideo = {
      attribute: 0,
      flag: 0,
      id: trackVideoId,
      is_default_name: true,
      name: '',
      segments,
      type: 'video'
    }
    // 3. tracks
    const tracks = [trackVideo]
    config.tracks = tracks
    // config.tracks[0].id = trackVideoId
    // config.tracks[0].segments = segments
    return config
  }

  const config = completeConfig(DraftContentConfig)
  const targetFiles = ['draft_content.json', 'draft_content.json.back', 'template-2.tmp']

  targetFiles.forEach((file) => {
    const targetFilePath = path.join(draftProjectDir, file)
    writeJsonConfigToFile(config, targetFilePath)
  })

  // return config
}

// 2.2 draft_meta_info.json 转换 draft_virtual_store.json
export function generateDraftMetaInfo() {}
