import { type IImage } from '~/app/interfaces';
import { urlFor } from '~/server/sanity/sanity.utils';

interface Props {
  image: IImage;
  className?: string;
  hotspot?: boolean;
}

const CustomCropImage = ({ image, className, hotspot }: Props) => {
  let src = image.url;
  console.log('this is the image: ', image);
  console.log('this is the image hotspot: ', image.hotspot);
  console.log('this is the image crop: ', image.crop);

  const customHotspot = (hotspot: IImage['hotspot']) => {
    if (!hotspot || !hotspot.x || !hotspot.y) {
      return { objectPosition: 'center' };
    }
    return {
      objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`,
    };
  };

  const hotspotStyle = hotspot ? customHotspot(image.hotspot) : {};

  if (image.assetId) {
    try {
      const hotspot = image.hotspot ?? { x: 0.5, y: 0.5 };
      const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
      src = urlFor({ _id: image.assetId, crop, hotspot }).url();
      // if (image.alt === 'Fork with pasta') {
      //   console.log('This is the pasta image and url');
      //   console.log(src);
      // } else {
      //   console.log('other images');
      //   console.log(src);
      // }
    } catch (error) {
      console.error('Error building image URL:', error);
    }
  } else {
    console.log('No image assetId found for image:', image);
  }
  return (
    <img
      className={className}
      src={src}
      alt={image.alt ?? 'Default alt text'}
      style={hotspotStyle}
    />
  );
};

export default CustomCropImage;
