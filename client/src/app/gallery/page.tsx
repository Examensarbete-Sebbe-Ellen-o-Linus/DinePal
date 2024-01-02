import { fetchGalleryPageData } from "../../../../server/sanity/sanity.utils";

export default async function GalleryPage() {
  const galleryPageData = await fetchGalleryPageData();

  // Render loading state if data is not yet fetched
  if (!galleryPageData) {
    return <div>Loading...</div>;
  }
  const { galleryImgs, title } = galleryPageData;

  return (
    <>
      <h2>Gallery</h2>
      <div>{title}</div>
      <div>
        {galleryImgs &&
          galleryImgs.map((image, i) => (
            <img key={i} src={image.url} alt={image.alt} />
          ))}
      </div>
    </>
  );
}
