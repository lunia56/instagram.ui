import { Area, Size } from 'react-easy-crop'

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

function rotateSize(width: number, height: number, rotation: number): Size {
  const rotRad = getRadianAngle(rotation)

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

export default async function getCroppedImg(
  imageSrc: string | Blob,
  pixelCrop: Area | undefined,
  filter: string = 'none',
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<unknown> {
  const image = await createImage(String(imageSrc))
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  ctx.filter = filter || 'none'
  ctx.drawImage(image, 0, 0)

  // @ts-ignore
  const data = ctx.getImageData(pixelCrop.x!, pixelCrop.y!, pixelCrop.width!, pixelCrop.height!)

  // @ts-ignore
  if (typeof pixelCrop.width === 'number') {
    // @ts-ignore
    canvas.width = pixelCrop.width
  }
  // @ts-ignore
  if (typeof pixelCrop.height === 'number') {
    // @ts-ignore
    canvas.height = pixelCrop.height
  }

  ctx.putImageData(data, 0, 0)

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file as Blob))
    }, 'image/jpeg')
  })
}
