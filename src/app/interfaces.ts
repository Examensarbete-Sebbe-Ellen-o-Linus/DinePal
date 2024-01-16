// Image interface used in multiple places
export interface IImage {
  _type: 'image';
  url: string;
  alt?: string;
  link?: IButton;
}

// Button interface
export interface IButton {
  _type: 'link';
  _key: string;
  pageType: string; // e.g., 'go-to-menu'
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
  descriptionFirstP?: string;
  descriptionSecondP?: string;
  image: IImage;
  button: IButton[];
}

// Dish interface
export interface IDish {
  _type: 'dish';
  _key: string;
  title: string;
  description?: string;
  image: IImage;
  price: number;
  tags: string[];
  slug: {
    current: string;
  };
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
  imageSection: IImageSection;
  about: IAbout;
  news: INews;
  seo: ISEO;
}

// Gallery page
export interface IGalleryPage {
  _type: 'galleryPage';
  title: string;
  galleryImgs: IImage[];
  seo: ISEO;
}

// Checkout page
export interface ICheckoutPage {
  _type: 'checkoutPage';
  title: string;
  checkoutImg: IImage;
  seo: ISEO;
}

// Booking page
export interface IBookingPage {
  _type: 'bookingPage';
  title: string;
  text: string;
}

// Image section
export interface IImageSection {
  _type: 'imageSection';
  title?: string;
  description: string;
  imageCards: IImage[];
  link: IButton;
}
export interface ISettings {
  header: IHeader;
  footer: IFooter;
}

// Footer interface
export interface IFooter {
  preFooter: IImage;
  openingHours: IOpeningHours[];
  socials: ISocials[];
  logotype: IImage;
  address: IAddress;
  phone: string;
  email: string;
  homePageLink?: string;
}

// Opening hours interface within Footer
export interface IOpeningHours {
  day: string;
  hours: string;
  _key: string;
}

// Socials interface
export interface ISocials {
  _type: 'socialLink';
  _key: string;
  platform: string;
  url: string;
  icon: IImage;
}

// Address interface
export interface IAddress {
  street: string;
  postalCode: string;
  city: string;
}

export interface IHeader {
  navLinks: IButton[];
  logotype: IImage;
}
export interface INews {
  title: string;
  description: string;
  image: IImage;
}

export interface IMenuPage {
  title: string;
  promo: IPromo;
}
export interface IPromo {
  text: string;
  button: IButton;
}
