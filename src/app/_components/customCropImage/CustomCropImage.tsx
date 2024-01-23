import { type IImage } from '~/app/interfaces';
import { urlFor } from '~/server/sanity/sanity.utils';

interface Props {
  image: IImage;
  className?: string;
  hotspot?: boolean;
}

export default function CustomCropImage({ image, className, hotspot }: Props) {
  let src = '';

  const customHotspot = (hotspot: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  }) => {
    if (!hotspot || !hotspot.x || !hotspot.y) {
      return { objectPosition: 'center' };
    }
    return {
      objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`,
    };
  };

  const hotspotStyle = hotspot ? customHotspot(image.hotspot) : {};

  if (image && image.assetId) {
    try {
      const imageObj = buildImageObj(image);
      src = urlFor(imageObj).url();
      console.log('this works, image: ', image);
    } catch (error) {
      console.error('Error building image URL:', error);
    }
  } else if (image && image.url) {
    src = image.url;
  } else {
    console.log('No assetId or url was found for image:', image);
  }

  return (
    <img
      className={className}
      src={src}
      alt={image?.alt ?? 'Default alt text'}
      style={hotspotStyle}
    />
  );
}

export function buildImageObj(source: IImage) {
  const imageObj: {
    asset: { _ref: string };
    crop?: IImage['crop'];
    hotspot?: IImage['hotspot'];
  } = {
    asset: { _ref: source.assetId },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}
