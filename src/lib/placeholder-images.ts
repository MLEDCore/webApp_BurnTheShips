import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Testimonial = {
  id: number;
  name: string;
  title: string;
  quote: string;
  avatarId: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
export const testimonials: Testimonial[] = data.testimonials;
