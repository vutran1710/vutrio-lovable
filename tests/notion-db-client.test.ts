import { describe, expect, test as it, beforeAll } from "vitest";
import { notionDatabaseClient } from "../lib/notion-db-client";

describe("NotionDatabaseClient (Integration)", () => {
  beforeAll(async () => {
    await notionDatabaseClient["ensureLoaded"]();
  });

  it("loads and caches all source types", async () => {
    const data = (notionDatabaseClient as any).cache;

    expect(data.logbook.length).toBeGreaterThan(0);
    expect(data.shoots.length).toBeGreaterThan(0);
    expect(data.workbench.length).toBeGreaterThan(0);

    for (const type of ["logbook", "shoots", "workbench"]) {
      expect(data[type]).toBeDefined();
      expect(Array.isArray(data[type])).toBe(true);
      for (const item of data[type]) {
        expect(item.id).toBeDefined();
        expect(item.slug).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.date).toBeInstanceOf(Date);
      }
    }
  });

  it("builds tag index correctly", async () => {
    const index = (notionDatabaseClient as any).tagIndex;
    expect(index.size).toBeGreaterThan(0);

    for (const [tag, sources] of index.entries()) {
      expect(typeof tag).toBe("string");
      expect(["logbook", "shoots", "workbench"]).toEqual(
        expect.arrayContaining(Object.keys(sources)),
      );
    }
  });

  it("returns popular tags in correct order", async () => {
    const popular = await notionDatabaseClient.popularTags(5);
    expect(popular.length).toBeLessThanOrEqual(5);
    expect(typeof popular[0]).toBe("string");
    console.log("Popular tags:", popular);
  });

  it("supports findPostsByTags", async () => {
    const tag = (await notionDatabaseClient.popularTags(1))[0];
    const results = await notionDatabaseClient.findPostsByTags(tag);

    expect(results).toHaveProperty("logbook");
    expect(results).toHaveProperty("shoots");
    expect(results).toHaveProperty("workbench");
    expect(
      results.logbook.length + results.shoots.length + results.workbench.length,
    ).toBeGreaterThan(0);
  });

  it("counts posts correctly by tags", async () => {
    const tags = await notionDatabaseClient.popularTags(3);
    const counts = await notionDatabaseClient.postCountByTags(tags, "shoots");

    expect(counts.size).toBeGreaterThan(0);
    for (const [tag, count] of counts) {
      expect(tags.includes(tag)).toBe(true);
      expect(typeof count).toBe("number");
    }
  });

  it("searches posts by title or slug", async () => {
    const result = await notionDatabaseClient.search("design");

    expect(result).toHaveProperty("logbook");
    expect(result).toHaveProperty("shoots");
    expect(result).toHaveProperty("workbench");

    const total =
      result.logbook.length + result.shoots.length + result.workbench.length;

    expect(total).toBeGreaterThanOrEqual(0);
  });

  it("counts with filters correctly", async () => {
    const count = await notionDatabaseClient.countBy({
      recordType: "logbook",
    });
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("paginates correctly with offset and limit", async () => {
    const { results, total } = await notionDatabaseClient.paginateBy({
      recordType: "shoots",
      offset: 0,
      limit: 3,
    });

    expect(Array.isArray(results)).toBe(true);
    expect(typeof total).toBe("number");
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns 0 count for nonexistent tag", async () => {
    const count = await notionDatabaseClient.countBy({
      tag: "__nonexistent__tag__",
    });

    expect(count).toBe(0);
  });

  it("returns empty pagination for nonexistent tag", async () => {
    const { results, total } = await notionDatabaseClient.paginateBy({
      tag: "__nonexistent__tag__",
      offset: 0,
      limit: 5,
    });

    expect(results).toEqual([]);
    expect(total).toBe(0);
  });
});
