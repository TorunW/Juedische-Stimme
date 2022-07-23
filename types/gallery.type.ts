import type { Image } from "./Image.type";

export type Gallery = {
    gallery_id: number;
    gallery_name: string;
    gallery_description: string;
    imageSrcs: string;
    images?: Image[];
}