import { test, expect } from "@playwright/test";

export default function getItemTest() {
    test("Get all products", async ({ request }) => {
        const response = await request.get("/rd-api/rubber-ducks");
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
        data.forEach((item: any) => {
            expect(item).toHaveProperty("name");
            expect(typeof item.name).toBe("string");
            expect(item.name.length).toBeGreaterThan(0);
        });
    });

    test('Get ducks with description "Chunky"', async ({ request }) => {
        const response = await request.get(
            "/rd-api/rubber-ducks/query/description/Chunky"
        );
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
        data.forEach((item: any) => {
            expect(item).toHaveProperty("name");
            expect(typeof item.name).toBe("string");
            expect(item.name.length).toBeGreaterThan(0);
            expect(item).toHaveProperty("description");
            expect(item.description).toContain("Chunky");
        });
    });
}
