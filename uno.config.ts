// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss'
import unoCommon from './src/styles/unoCommon'

export default defineConfig({
  rules: [
    [
      /^c-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      }
    ]
  ],
  theme: {
    ...unoCommon
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  shortcuts: [
    //mobile
    {
      'm-headline-bold-xxl': 'font-bold text-28px ',
      'm-headline-semibold-xl': 'font-semibold text-20px ',
      'm-headline-regular': 'font-normal text-16px ',
      'm-paragraph-regular': 'font-normal text-14px line-height-150%'
    },
    {
      'm-p-inner': 'px-37.5px'
    },
    // portal
    {
      'headline-xxl': 'font-black text-120px ',
      'headline-xl': 'font-black text-64px ',
      'headline-large-italic': 'font-black font-italic text-40px',
      'headline-large': 'font-black text-40px ',
      'headline-medium': 'font-black text-24px',
      'headline-regular': 'font-black text-16px',
      'headline-small': 'font-black text-12px'
    },
    {
      'p-inner': 'px-100px'
    },
    //Universal
    {
      'flex-col-center': 'flex flex-col justify-center items-center',
      'flex-center': 'flex justify-center items-center',
      'shadow-image': 'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
      'shadow-text':' text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
      'rd-regular': 'rd-5px'
    }
  ]
})
