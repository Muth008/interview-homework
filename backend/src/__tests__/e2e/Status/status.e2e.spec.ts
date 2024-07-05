import supertest from "supertest";
import app from "../../../app";
import { Status } from "../../../models/status.model";

describe('E2E Tests for Status API', () => {
    let statusId: number;

    it('should create a new status and return it', async () => {
        const response = await supertest(app)
            .post('/api/status') 
            .send({ name: 'Test Status' }) 
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Test Status');
        statusId = response.body.id; 
    });

    it('should update the created status', async () => {
        const updatedName = 'Updated Test Status';
        const response = await supertest(app)
            .put('/api/status') 
            .send({ id: statusId, name: updatedName })
            .expect(200);

        expect(response.body).toHaveProperty('name', updatedName);
    });

    it('should get the updated status', async () => {
        const response = await supertest(app)
            .get(`/api/status?id=${statusId}`) 
            .expect(200);

        expect(response.body).toHaveProperty('id', statusId);
        expect(response.body).toHaveProperty('name', 'Updated Test Status');
    });

    it('should list all statuses including the updated one', async () => {
        const response = await supertest(app)
            .post('/api/status/list') 
            .send({}) 
            .expect(200);

        const status = response.body.find((status: Status) => status.id === statusId);
        expect(status).toBeDefined();
        expect(status.name).toBe('Updated Test Status');
    });

    it('should delete the updated status', async () => {
        await supertest(app)
            .delete(`/api/status?id=${statusId}`) 
            .expect(200);

        await supertest(app)
            .get(`/api/status?id=${statusId}`) 
            .expect(404);
    });
});