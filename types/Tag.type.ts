export type Tag = {
    term_id:number;
    name:string;
    slug:string;
    term_group:number;
    term_taxonomy_id:number;
    taxonomy:string;
    parent:number;
    count:number;
    description?:string;
}