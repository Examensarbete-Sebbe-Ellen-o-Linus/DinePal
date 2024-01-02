import { IImageSection } from "../interfaces";

export default function ImageSection({
  imageSection,
}: {
  imageSection: IImageSection;
}) {
  return (
    <section>
      {imageSection.description && <h1>{imageSection.description}</h1>}
      {imageSection.title && <h1>{imageSection.title}</h1>}
      <div>
        {imageSection.imageCards &&
          imageSection.imageCards.map((image, i) => (
            <div key={i}>
              <img src={image.url} alt={image.alt} />
              {image.link && <h4>{image.link.text}</h4>}
            </div>
          ))}
      </div>
    </section>
  );
}
