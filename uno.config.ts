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
      'headline-bold-xxl': 'font-bold text-48px ',
      'headline-bold-xl': 'font-bold text-36px ',
      'headline-bold': 'font-bold text-28px ',
      'headline-semibold-regular': 'font-semibold text-24px',
      'paragraph-regular': 'font-normal text-16px line-height-150%',
      'paragraph-medium': 'font-medium text-20px line-height-150%'
    },
    {
      'p-inner': 'px-100px'
    },
    //Universal
    {
      'flex-col-center': 'flex flex-col items-center',
      'flex-center': 'flex justify-center items-center',
      'shadow-image': 'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
    }
  ]
})
