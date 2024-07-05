import { PrismaClient } from '@prisma/client';
import ProductDAO from './product.dao';
import { Product } from '../models/product.model';

// Mock the Prisma Client
jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');

    return {
        __esModule: true,
        ...originalModule,
        PrismaClient: jest.fn().mockImplementation(() => ({
            product: {
                findMany: jest.fn(),
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
        })),
    };
});

describe('ProductDAO', () => {
    let productDAO: ProductDAO;
    let prisma: PrismaClient;
    
    const mockProducts: Product[] = [{ id: 1, name: 'Test Product', quantity: 0, price: 0 }];
    const mockProductCriteria = { name: 'Test Product' };

    beforeEach(() => {
        prisma = new PrismaClient();
        productDAO = new ProductDAO(prisma);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all products', async () => {
        
        (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

        const products = await productDAO.getAllProducts();
        expect(products).toEqual(mockProducts);
        expect(prisma.product.findMany).toHaveBeenCalled();
    });

    it('should create a product', async () => {
        const mockProductData: Product = mockProducts[0];
        (prisma.product.create as jest.Mock).mockResolvedValue(mockProductData);

        const product = await productDAO.createProduct(mockProductData);
        expect(product).toEqual(mockProductData);
        expect(prisma.product.create).toHaveBeenCalledWith({
            data: mockProductData,
        });
    });

    it('should list products based on criteria', async () => {

        (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    
        const products = await productDAO.listProducts(mockProductCriteria);
        expect(products).toEqual(mockProducts);
        expect(prisma.product.findMany).toHaveBeenCalledWith({
            where: mockProductCriteria,
        });
    });
    
    it('should get a product by id', async () => {
        const mockProduct = { id: 1, name: 'Test Product' };
        (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
    
        const product = await productDAO.getProductById(1);
        expect(product).toEqual(mockProduct);
        expect(prisma.product.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });
    
    it('should update a product', async () => {
        const mockProductData = { id: 1, name: 'Updated Product', quantity: 20, price: 100 };
        (prisma.product.update as jest.Mock).mockResolvedValue(mockProductData);
    
        const product = await productDAO.updateProduct(mockProductData);
        expect(product).toEqual(mockProductData);
        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: { name: 'Updated Product', quantity: 20, price: 100 },
        });
    });
    
    it('should delete a product', async () => {
        const mockProductId = 1;
        (prisma.product.delete as jest.Mock).mockResolvedValue({ id: mockProductId, name: 'Deleted Product' });
    
        const product = await productDAO.deleteProduct(mockProductId);
        expect(product).toEqual({ id: mockProductId, name: 'Deleted Product' });
        expect(prisma.product.delete).toHaveBeenCalledWith({
            where: { id: mockProductId },
        });
    });
    
    it('should increment product quantity', async () => {
        const mockProductId = 1;
        const incrementQuantity = 5;
        const mockProduct = { id: mockProductId, quantity: 15 };
        (prisma.product.update as jest.Mock).mockResolvedValue(mockProduct);
    
        const product = await productDAO.incrementProductQuantity(mockProductId, incrementQuantity);
        expect(product).toEqual(mockProduct);
        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: mockProductId },
            data: { quantity: { increment: incrementQuantity } },
        });
    });
    
    it('should decrement product quantity', async () => {
        const mockProductId = 1;
        const decrementQuantity = 3;
        const mockProduct = { id: mockProductId, quantity: 7 };
        (prisma.product.update as jest.Mock).mockResolvedValue(mockProduct);
    
        const product = await productDAO.decrementProductQuantity(mockProductId, decrementQuantity);
        expect(product).toEqual(mockProduct);
        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: mockProductId },
            data: { quantity: { decrement: decrementQuantity } },
        });
    });
});