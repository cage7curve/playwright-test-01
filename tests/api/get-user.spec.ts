import { test, expect } from "@playwright/test";

test("GET user 12", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/12", {
    headers: {
      "x-api-key": "reqres_72110728c7114b83b57a5567d151bc96",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toEqual(
    expect.objectContaining({
      data: {
        id: 12,
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        avatar: "https://reqres.in/img/faces/12-image.jpg",
      },
    }),
  );
});

test("GET user 1234", async ({ request }) => {
 const response = await request.get("https://reqres.in/api/users/1234", {
    headers: {
      "x-api-key": "reqres_72110728c7114b83b57a5567d151bc96",
    },
  });

  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body).toEqual(
    {}
  );
});
