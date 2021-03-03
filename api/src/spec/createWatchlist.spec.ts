import { createTestContext } from "./__helpers";

const ctx = createTestContext();

describe("createWatchlistMutation", () => {
  it("should create watchlist", async () => {
    const result = await ctx.client.request(
      `
      mutation CreateWatchlist($name: String!) {
        createWatchlist(name: $name) {
          id
          name
          hiddenColumns
        }
      }`,
      { name: "Test watchlist" }
    );
    expect(result).toMatchInlineSnapshot(`
      Object {
        "createWatchlist": Object {
          "hiddenColumns": null,
          "id": 1,
          "name": "Test watchlist",
        },
      }
    `);
  });

  it("should return created watchlist", async () => {
    const watchlists = await ctx.prisma.watchlist.findMany();
    expect(watchlists).toMatchInlineSnapshot(`
      Array [
        Object {
          "createAt": 2021-03-03T17:12:26.655Z,
          "hiddenColumns": null,
          "id": 1,
          "name": "Test watchlist",
          "userId": 1,
        },
      ]
    `);
  });
});
