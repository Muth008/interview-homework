export interface Shipment {
    id?: number;
    shipmentId: string;
    companyName: string;
    shipmentDate: string;
    statusId: number;
    createdAt?: string;
    updatedAt?: string;
    products?: Shipmentproduct[];
}

export interface Shipmentproduct {
    shipmentId?: number;
    productId: number;
    quantity: number;
}