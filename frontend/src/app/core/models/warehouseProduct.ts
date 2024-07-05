export interface WarehouseProduct {
    id?: number;
    name: string;
    description?: string;
    imageUrl?: string;
    quantity: number;
    price: number;
    image?: Blob;
}