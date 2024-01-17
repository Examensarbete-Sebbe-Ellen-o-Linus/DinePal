import { type CSSProperties } from 'react';
import { type IImage } from '~/app/interfaces';

export function getPositionFromHotspot(hotspot: IImage['hotspot']) {
  if (!hotspot || !hotspot.x || !hotspot.y) {
    return { objectPosition: 'center' };
  }

  return {
    objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%`,
  };
}

export function getCropStyle(crop: IImage['crop']) {
  console.log('in croped before if, crop: ', crop);

  // Check if crop is null or all values are zero
  if (
    !crop ||
    (crop.bottom === 0 && crop.top === 0 && crop.left === 0 && crop.right === 0)
  ) {
    console.log('Not cropped');
    return {};
  }

  const border: CSSProperties['border'] = '2px solid pink';
  const overflow: CSSProperties['overflow'] = 'hidden';
  const objectFit: CSSProperties['objectFit'] = 'cover';
  const objectPosition = `${(1 - crop.right) * 100}% ${
    (1 - crop.bottom) * 100
  }% ${(1 - crop.left) * 100}% ${(1 - crop.top) * 100}%`;

  return { objectFit, objectPosition, border, overflow };
}

const CustomImage = ({
  image,
  className,
}: {
  image: IImage;
  className?: string;
}) => {
  const cropStyles: CSSProperties = image.crop
    ? {
        position: 'relative',
        overflow: 'hidden',
        paddingTop: `${(image.crop.top || 0) * 100}%`,
        paddingRight: `${(image.crop.right || 0) * 100}%`,
        paddingBottom: `${(image.crop.bottom || 0) * 100}%`,
        paddingLeft: `${(image.crop.left || 0) * 100}%`,
      }
    : {};
  const imageStyles = getPositionFromHotspot(image.hotspot);
  // const cropStyles = getCropStyle(image.crop);
  const sanityStyles = { ...cropStyles, ...imageStyles };

  return (
    // <Box style={cropStyles}>
    <img
      className={className}
      src={image.url}
      alt={image.alt ?? 'image'}
      style={imageStyles}
    />
    // </Box>
  );
};

export default CustomImage;
