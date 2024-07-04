export * from './health.service';
import { HealthService } from './health.service';
export * from './product.service';
import { ProductService } from './product.service';
export * from './shipment.service';
import { ShipmentService } from './shipment.service';
export * from './status.service';
import { StatusService } from './status.service';
export const APIS = [HealthService, ProductService, ShipmentService, StatusService];
