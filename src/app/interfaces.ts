// Image interface used in multiple places
export interface IImage {
  _type: 'image';
  url: string;
  alt?: string;
}

// Button interface
export interface IButton {
  _type: 'button';
  _key: string;
  actionType: string; // e.g., 'go-to-menu'
  text: string; // e.g Go to menu
}

// Hero section interface
export interface IHero {
  _type: 'hero';
  title: string;
  description?: string;
  image: IImage;
  buttons: IButton[];
}

// About section interface
export interface IAbout {
  _type: 'about';
  title: string;
  description?: string;
  image: IImage;
  button: IButton[];
}

// Dish interface
export interface IDish {
  _type: 'dish';
  title: string;
  description?: string;
  image: IImage;
  price: number;
  tags: ITag[];
  slug: {
    current: string;
  };
}

// Tag interface within Dish
export interface ITag {
  _type: 'tag';
  label: string; // e.g., 'Gluten-free'
}

// SEO settings interface
export interface ISEO {
  _type: 'seo';
  metaTitle?: string;
  metaDescription?: string;
}

// Main HomePage interface
export interface IHomePage {
  _type: 'homePage';
  title: string;
  hero: IHero;
  selectedDishes: IDish[];
  about: IAbout;
  seo: ISEO;
}

// Gallery page
export interface IGalleryPage {
  _type: 'galleryPage';
  title: string;
  galleryImgs: IImage[];
  seo: ISEO;
}
