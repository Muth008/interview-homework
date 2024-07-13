import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsListService } from './products-list.service';
import { ProductService } from 'src/app/api';
import { CommonUtilsService } from 'src/app/common/utils/common-utils.service';
import { BehaviorSubject, of } from 'rxjs';
import { WarehouseProduct } from 'src/app/core/models/warehouseProduct';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ProductsListService', () => {
    let service: ProductsListService;
    let productServiceMock: any;
    let commonUtilsServiceMock: any;

    beforeEach(() => {
        productServiceMock = {
            apiProductListPost: jasmine.createSpy().and.returnValue(of([{ id: 1, name: 'Test Product' }])),
            apiProductGet: jasmine.createSpy().and.returnValue(of({ id: 1, name: 'Test Product' })),
            apiProductPost: jasmine.createSpy().and.returnValue(of(null)),
            apiProductPut: jasmine.createSpy().and.returnValue(of(null))
        };

        commonUtilsServiceMock = {
            filterOutNullProperties: jasmine.createSpy().and.callFake((product) => product)
        };

        TestBed.configureTestingModule({
    imports: [],
    providers: [
        ProductsListService,
        { provide: ProductService, useValue: productServiceMock },
        { provide: CommonUtilsService, useValue: commonUtilsServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

        service = TestBed.inject(ProductsListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getProducts should fetch products and emit them', (done) => {
        service.getProducts().subscribe();
        service.productsUpdate.subscribe((products) => {
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('Test Product');
            done();
        });
    });

    it('getProduct should fetch a single product by id', (done) => {
        service.getProduct(1).subscribe((product) => {
            expect(productServiceMock.apiProductGet).toHaveBeenCalledWith(1);
            expect(product.name).toBe('Test Product');
            done();
        });
    });

    it('addProduct should call apiProductPost and refresh products list', (done) => {
        const product: WarehouseProduct = { id: 2, name: 'New Product', quantity: 10, price: 100 };
        service.productsUpdate = new BehaviorSubject<Array<WarehouseProduct>>([]);

        service.addProduct(product);

        service.productsUpdate.subscribe((products) => {
            expect(productServiceMock.apiProductPost).toHaveBeenCalled();
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('Test Product');
            done();
        });
    });

    it('updateProduct should call apiProductPut and refresh products list', (done) => {
        const product: WarehouseProduct = { id: 1, name: 'Updated Product', quantity: 10, price: 100 };
        service.productsUpdate = new BehaviorSubject<Array<WarehouseProduct>>([]);

        service.updateProduct(product);

        service.productsUpdate.subscribe((products) => {
            expect(productServiceMock.apiProductPut).toHaveBeenCalled();
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('Test Product');
            done();
        });
    });

    it('refreshProducts should fetch products and emit them', (done) => {
        service.refreshProducts();

        service.productsUpdate.subscribe((products) => {
            expect(products.length).toBe(1);
            expect(products[0].name).toBe('Test Product');
            done();
        });
    });
});