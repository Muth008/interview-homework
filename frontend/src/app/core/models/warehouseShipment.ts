export interface WarehouseShipment {
    id: number;
    companyName: string;
    shipmentId?: string;
    shipmentDate: string;
    statusId: number;
    createdAt?: string;
    updatedAt?: string;
    products: Array<WarehouseShipmentProduct>;
}

export interface WarehouseShipmentProduct {
    productId: number;
    quantity: number;
}

export interface WarehouseShipmentStatus {
    id: number;
    name: string;
}