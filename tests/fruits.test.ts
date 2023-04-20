import supertest from "supertest";
import app from "index";

const api = supertest(app);

describe("Testando a API", () => {

    it("Testando a Rota POST: /fruits", async () => {
        const body = {
            name: "Maracujá",
            price: 40,
        }

        const result = await api.post("/fruits").send(body);
        expect(result.status).toEqual(201);

        const sameBody = await api.post("/fruits").send(body);
        expect(sameBody.status).toEqual(409);
        
    })

    it("Testando Rota GET: /fruits", async () => {
        const result = await api.get("/fruits");
       
        expect(result.status).toBe(200);

        const body = {
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        }

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ...body,
                })
            ]));
    });

    it("Testando a Rota GET: /fruits/:id", async () => {

        const body = {
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        }

        const result = await api.get("/fruits/1");

        expect(result.status).toBe(200);

        expect(result.body.id).toEqual(body.id);

        const errorResult = await api.get("/fruits/999");

        expect (errorResult.status).toBe(404);
    });
});

