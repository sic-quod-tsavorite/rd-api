import { test, expect } from "@playwright/test";

export default function createItemTest() {
  test("Create new product item (Expect fail when token verification enabled in routes)", async ({ request }) => {
    test.setTimeout(10_000);

    const createUser = {
      name: "Lars Larsen",
      email: "mail@larsen.com",
      password: "12345678",
    };

    // Act
    await request.post("/rd-api/user/register", { data: createUser });

    // Login to get a token
    const loginResponse = await request.post("/rd-api/user/login", {
      data: {
        email: createUser.email,
        password: createUser.password,
      },
    });
    const loginJson = await loginResponse.json();
    //console.log("Login response:", loginJson);
    //const token = loginJson.data.token;
    const userId = loginJson.data.userId;
    //console.log("Token:", token);

    // Arrange new duck
    const newItem = {
      name: "Test Duck",
      description: "A test duck for API testing",
      imageURL: "https://example.com/duck.jpg",
      price: 1234,
      onSale: false,
      discountPct: 0,
      isHidden: false,
      _createdBy: userId,
    };

    // Act: Create duck with Authorization header
    const response = await request.post("/rd-api/rubber-ducks", {
      data: newItem,
      /*headers: {
        Authorization: `Bearer ${token}`,
      },*/
    });
    const json = await response.json();

    // Assert
    expect(response.status()).toBe(401);
    /*expect(json.name).toBe(newItem.name);
    expect(json.description).toBe(newItem.description);
    expect(json.price).toBe(newItem.price);*/
  });
}
