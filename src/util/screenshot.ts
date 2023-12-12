import html2canvas from 'html2canvas'
import { ref, type Component } from 'vue'
import { useModal } from 'vue-final-modal'
import ConfirmModal from '@/components/modal/ConfirmModal.vue'

export const useScreenshot = (basicModal: Component) => {
  const screenshotImage = ref('')

  const takeScreenshot = async () => {
    try {
      const targetElement: HTMLElement = document.getElementById('crypto-block-container')

      const options = {
        scale: 0.85,
        backgroundColor: '#1c1c1c',
        type: 'image/png',
        useCORS: false,
        // allowTaint: true,
        // proxy: 'https://assets.coingecko.com'
      }

      const canvas = await html2canvas(targetElement, options)
      const dataURL = canvas.toDataURL('image/png')
      screenshotImage.value = dataURL

      const { open, close } = useModal({
        component: basicModal,
        attrs: {
          onConfirm() {
            copyImageToClipBoard(dataURL)
            close()
            openConfirm()
          },
          onClose() {
            close()
          },
          escToClose: true
        },
        slots: {
          default: `<img src="${dataURL}" id="screenshot-image" /> <p>click confirm to copy image to clipboard</p>`
        }
      })

      open()
    } catch (error) {
      console.error('Error capturing screenshot:', error)
    }
  }

  const copyImageToClipBoard = async (src: string) => {
    const data = await fetch(src)
    const blob = await data.blob()

    try {
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const { open: openConfirm, close: closeConfirm } = useModal({
    component: ConfirmModal,
    attrs: {
      onConfirm() {
        closeConfirm()
      },
      escToClose: true
    },
    slots: {
      default: `<p>image copied to clipboard!</p>`
    }
  })

  return {
    screenshotImage,
    takeScreenshot,
    copyImageToClipBoard
  }
}
