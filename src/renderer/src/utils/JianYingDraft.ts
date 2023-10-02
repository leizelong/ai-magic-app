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
  duration: 25000000,
  extra_info: null,
  fps: 30.0,
  free_render_index_mode_on: false,
  group_container: null,
  id: '0A4DDAA8-8595-4f08-B1C3-9B915522AEAF',
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
    audios: [
      {
        app_id: 0,
        category_id: '',
        category_name: 'local',
        check_flag: 1,
        duration: 10066666,
        effect_id: '',
        formula_id: '',
        id: 'C40C7FD9-79B3-44e3-8559-8C898D18893B',
        intensifies_path: '',
        local_material_id: '29a2d773-ecc8-41c6-aabb-c525622b13f1',
        music_id: '9c8e9a97-70a3-4dc8-8db1-80d97756090c',
        name: '01-noart-10s.mp3',
        path: 'D:/ai-workspace/好声音第一集/01-noart-10s.mp3',
        query: '',
        request_id: '',
        resource_id: '',
        search_id: '',
        source_platform: 0,
        team_id: '',
        text_id: '',
        tone_category_id: '',
        tone_category_name: '',
        tone_effect_id: '',
        tone_effect_name: '',
        tone_speaker: '',
        tone_type: '',
        type: 'extract_music',
        video_id: '',
        wave_points: []
      }
    ],
    beats: [
      {
        ai_beats: {
          beat_speed_infos: [],
          beats_path: '',
          beats_url: '',
          melody_path: '',
          melody_percents: [0.0],
          melody_url: ''
        },
        enable_ai_beats: false,
        gear: 404,
        gear_count: 0,
        id: '08ACED09-3C12-4581-A2EB-7EFCAE107D2F',
        mode: 404,
        type: 'beats',
        user_beats: [],
        user_delete_ai_beats: null
      }
    ],
    canvases: [
      {
        album_image: '',
        blur: 0.0,
        color: '',
        id: '70E705CE-02CF-4888-A29A-5636CCDEBFA5',
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
        id: 'B138C2EC-8A1B-4a48-836E-209D6A8665DB',
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
        id: '29D0D0C7-EF37-439a-AD9F-5A0D18213D9A',
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
        id: 'E4541045-68E7-4be7-9E23-330E40CEEBFD',
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
        id: 'CD8B016D-01C2-4f50-9F3A-A2783BCBCCC3',
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
        id: 'B7BDE093-00BE-4010-86DA-EBC7EF353BF8',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '32CEC0CB-2E97-4bd3-9883-260061D35DF1',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: 'F8787D6E-7996-49a8-8504-D0CFB8CD3F28',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: 'FABBF9FE-E1A9-4b7f-B8DA-E39D9C092C92',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '2EE8C22E-4D45-4663-B6F6-801838B10E0C',
        is_config_open: false,
        type: ''
      },
      {
        audio_channel_mapping: 0,
        id: '55801D4D-43EC-4ae0-871D-9E14D689FAB4',
        is_config_open: false,
        type: ''
      }
    ],
    speeds: [
      {
        curve_speed: null,
        id: 'AF1929A1-EE74-4c02-B20B-F7030B302C0B',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '24433F04-A325-43e4-BE40-6E213D40A8E2',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '0B6A0CF0-0C82-4fad-B4A1-E5B60E1136FB',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: 'CDD7ED2E-7CA3-4071-AD2D-EB5CBE248CBB',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '04EB5F8B-9973-4646-B985-705B51FDBA4E',
        mode: 0,
        speed: 1.0,
        type: 'speed'
      },
      {
        curve_speed: null,
        id: '1470CB39-05AA-46aa-959F-5DCD405BDA81',
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
        id: 'BF690223-2863-4f7d-A719-C5D7FCF6E22C',
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
        id: '578B304C-7F0B-46bb-8B17-4CBB64138647',
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
        id: '0837FD10-74C3-4351-BE2F-D90A853269BD',
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
        id: '7BFE4E1C-DFC4-458e-B306-07C74C4D457C',
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
        id: '13B36E39-8857-47b8-B447-DE92D65D7F5E',
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
        id: '0A7CDF63-459E-4a9d-BBAA-303F3A9D3E9A',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: '24FE158D-E953-4fd8-B76F-7D66808BBB83',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: 'F3298763-567B-4319-A506-2463E34968E0',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: '8875C8A1-26F2-4d01-8B15-C99837E75E23',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: '3DD38C95-FCDE-4b1f-8F16-2750806EE0B2',
        production_path: '',
        time_range: null,
        type: 'vocal_separation'
      },
      {
        choice: 0,
        id: 'E056FD62-5633-43f5-83C2-7344BE7286AC',
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
      id: 'B9F0C05D-13FA-4baa-B02B-5BF023F790A7',
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
            'AF1929A1-EE74-4c02-B20B-F7030B302C0B',
            '70E705CE-02CF-4888-A29A-5636CCDEBFA5',
            'B7BDE093-00BE-4010-86DA-EBC7EF353BF8',
            '0A7CDF63-459E-4a9d-BBAA-303F3A9D3E9A'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '7AFA7339-8E5C-4e20-9F09-CF60A8EFD0BA',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: 'BF690223-2863-4f7d-A719-C5D7FCF6E22C',
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
            '24433F04-A325-43e4-BE40-6E213D40A8E2',
            'B138C2EC-8A1B-4a48-836E-209D6A8665DB',
            '32CEC0CB-2E97-4bd3-9883-260061D35DF1',
            '24FE158D-E953-4fd8-B76F-7D66808BBB83'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '42565DE3-8075-4b60-9177-579ABB99AD35',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '578B304C-7F0B-46bb-8B17-4CBB64138647',
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
            '0B6A0CF0-0C82-4fad-B4A1-E5B60E1136FB',
            '29D0D0C7-EF37-439a-AD9F-5A0D18213D9A',
            'F8787D6E-7996-49a8-8504-D0CFB8CD3F28',
            'F3298763-567B-4319-A506-2463E34968E0'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: 'AC992C8C-1AA0-4f79-A7BE-85A9EE7DB36F',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '0837FD10-74C3-4351-BE2F-D90A853269BD',
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
            'CDD7ED2E-7CA3-4071-AD2D-EB5CBE248CBB',
            'E4541045-68E7-4be7-9E23-330E40CEEBFD',
            'FABBF9FE-E1A9-4b7f-B8DA-E39D9C092C92',
            '8875C8A1-26F2-4d01-8B15-C99837E75E23'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: '3CA3F5DD-58C9-4bb6-8909-7757AF3B46D3',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '7BFE4E1C-DFC4-458e-B306-07C74C4D457C',
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
            '04EB5F8B-9973-4646-B985-705B51FDBA4E',
            'CD8B016D-01C2-4f50-9F3A-A2783BCBCCC3',
            '2EE8C22E-4D45-4663-B6F6-801838B10E0C',
            '3DD38C95-FCDE-4b1f-8F16-2750806EE0B2'
          ],
          group_id: '',
          hdr_settings: { intensity: 1.0, mode: 1, nits: 1000 },
          id: 'C077E98E-5E99-479b-8F35-59BAF7E34CCC',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: '13B36E39-8857-47b8-B447-DE92D65D7F5E',
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
    },
    {
      attribute: 0,
      flag: 0,
      id: 'A3A693B0-64E9-4360-83DE-D72C6E8272DD',
      is_default_name: true,
      name: '',
      segments: [
        {
          cartoon: false,
          clip: null,
          common_keyframes: [],
          enable_adjust: false,
          enable_color_curves: true,
          enable_color_wheels: true,
          enable_lut: false,
          enable_smart_color_adjust: false,
          extra_material_refs: [
            '1470CB39-05AA-46aa-959F-5DCD405BDA81',
            '08ACED09-3C12-4581-A2EB-7EFCAE107D2F',
            '55801D4D-43EC-4ae0-871D-9E14D689FAB4',
            'E056FD62-5633-43f5-83C2-7344BE7286AC'
          ],
          group_id: '',
          hdr_settings: null,
          id: '89081D02-D1E1-4154-9788-1D4565E45982',
          intensifies_audio: false,
          is_placeholder: false,
          is_tone_modify: false,
          keyframe_refs: [],
          last_nonzero_volume: 1.0,
          material_id: 'C40C7FD9-79B3-44e3-8559-8C898D18893B',
          render_index: 0,
          responsive_layout: {
            enable: false,
            horizontal_pos_layout: 0,
            size_layout: 0,
            target_follow: '',
            vertical_pos_layout: 0
          },
          reverse: false,
          source_timerange: { duration: 10066666, start: 0 },
          speed: 1.0,
          target_timerange: { duration: 10066666, start: 0 },
          template_id: '',
          template_scene: 'default',
          track_attribute: 0,
          track_render_index: 0,
          uniform_scale: null,
          visible: true,
          volume: 0.6210584044456482
        }
      ],
      type: 'audio'
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
    filePath: string
    fileName: string
  }
  audioList: Array<{
    filePath: string
    fileName: string
  }>
}

/** draft_content.json => draft_content.json.back, template-2.tmp */
export function generateDraftContent(data: GenerateDraftContentDto) {
  const { keyFrameList, draftProjectDir, videoInfo, audioList } = data

  const totalDuration = videoInfo.duration
  const draftContentId = generateUUID()

  function completeConfig(baseConfig: typeof DraftContentConfig) {
    const config: typeof DraftContentConfig = cloneDeep(baseConfig)
    config.duration = totalDuration
    config.id = draftContentId
    const totalLength = keyFrameList.length + audioList.length
    // 1. speeds
    const speeds = new Array(totalLength).fill({}).map(() => {
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
    const sound_channel_mappings = new Array(totalLength).fill({}).map(() => {
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
    const vocal_separations = new Array(totalLength).fill({}).map(() => {
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

    // audios
    const audios = audioList.map((audio) => {
      const musicId = generateUUID()
      const audioId = generateUUID()
      // todo metaInfo
      const local_material_id = generateUUID()
      const { fileName, filePath } = audio

      return {
        app_id: 0,
        category_id: '',
        category_name: 'local',
        check_flag: 1,
        duration: videoInfo.duration,
        effect_id: '',
        formula_id: '',
        // id: 'C40C7FD9-79B3-44e3-8559-8C898D18893B',
        id: audioId,
        intensifies_path: '',
        // local_material_id: '29a2d773-ecc8-41c6-aabb-c525622b13f1',
        local_material_id: local_material_id,
        // music_id: '9c8e9a97-70a3-4dc8-8db1-80d97756090c',
        music_id: musicId,
        // name: '01-noart-10s.mp3',
        // path: 'D:/ai-workspace/好声音第一集/01-noart-10s.mp3',
        name: fileName,
        path: filePath,
        query: '',
        request_id: '',
        resource_id: '',
        search_id: '',
        source_platform: 0,
        team_id: '',
        text_id: '',
        tone_category_id: '',
        tone_category_name: '',
        tone_effect_id: '',
        tone_effect_name: '',
        tone_speaker: '',
        tone_type: '',
        type: 'extract_music',
        video_id: '',
        wave_points: []
      }
    })

    config.materials.audios = audios

    // audios beats
    const beats = audioList.map(() => {
      const beatId = generateUUID()
      return {
        ai_beats: {
          beat_speed_infos: [],
          beats_path: '',
          beats_url: '',
          melody_path: '',
          melody_percents: [0.0],
          melody_url: ''
        },
        enable_ai_beats: false,
        gear: 404,
        gear_count: 0,
        // id: '08ACED09-3C12-4581-A2EB-7EFCAE107D2F',
        id: beatId,
        mode: 404,
        type: 'beats',
        user_beats: [],
        user_delete_ai_beats: null
      }
    })
    config.materials.beats = beats

    // segments => video => tracks

    // 1. videoSegments
    const videoSegments = keyFrameList.map((keyFrame, index) => {
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

    // 2. audioSegments
    const audioSegments = audioList.map((audio, index) => {
      const segmentId = generateUUID()
      const audioMaterialRef = audios[index]
      const speedMaterialRef = speeds[keyFrameList.length + index]
      const beatMaterialRef = beats[index]
      const soundMaterialRef = sound_channel_mappings[keyFrameList.length + index]
      const separationMaterialRef = vocal_separations[keyFrameList.length + index]
      const audioDuration = videoInfo.duration
      return {
        cartoon: false,
        clip: null,
        common_keyframes: [],
        enable_adjust: false,
        enable_color_curves: true,
        enable_color_wheels: true,
        enable_lut: false,
        enable_smart_color_adjust: false,
        extra_material_refs: [
          // '1470CB39-05AA-46aa-959F-5DCD405BDA81',
          // '08ACED09-3C12-4581-A2EB-7EFCAE107D2F',
          // '55801D4D-43EC-4ae0-871D-9E14D689FAB4',
          // 'E056FD62-5633-43f5-83C2-7344BE7286AC'
          speedMaterialRef.id,
          beatMaterialRef.id,
          soundMaterialRef.id,
          separationMaterialRef.id
        ],
        group_id: '',
        hdr_settings: null,
        // id: '89081D02-D1E1-4154-9788-1D4565E45982',
        id: segmentId,
        intensifies_audio: false,
        is_placeholder: false,
        is_tone_modify: false,
        keyframe_refs: [],
        last_nonzero_volume: 1.0,
        // material_id: 'C40C7FD9-79B3-44e3-8559-8C898D18893B',
        material_id: audioMaterialRef.id,
        render_index: 0,
        responsive_layout: {
          enable: false,
          horizontal_pos_layout: 0,
          size_layout: 0,
          target_follow: '',
          vertical_pos_layout: 0
        },
        reverse: false,
        source_timerange: { duration: audioDuration, start: 0 },
        speed: 1.0,
        target_timerange: { duration: audioDuration, start: 0 },
        template_id: '',
        template_scene: 'default',
        track_attribute: 0,
        track_render_index: 0,
        uniform_scale: null,
        visible: true,
        volume: 0.6210584044456482
      }
    })

    // 3. track video item
    const videoTrackId = generateUUID()
    const videoTrack = {
      attribute: 0,
      flag: 0,
      id: videoTrackId,
      is_default_name: true,
      name: '',
      segments: videoSegments,
      type: 'video'
    }
    // 3. track audio item
    const audioTrackId = generateUUID()
    const audioTrack = {
      attribute: 0,
      flag: 0,
      id: audioTrackId,
      is_default_name: true,
      name: '',
      segments: audioSegments,
      type: 'audio'
    }

    // 3. tracks
    const tracks = [videoTrack, audioTrack]
    config.tracks = tracks

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
