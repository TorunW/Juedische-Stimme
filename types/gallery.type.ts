import type { Image } from "./Image.type";

export type Gallery = {
    gallery_id: number;
    gallery_name: string;
    gallery_description: string;
    gallery_type: string;
    imageSrcs: string;
    images?: Image[];
}