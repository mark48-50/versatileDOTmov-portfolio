import assert from "node:assert/strict";
import { open, readdir, stat } from "node:fs/promises";
import { test } from "node:test";

const videosDirectory = new URL("../public/videos/", import.meta.url);

test("every deployed video is an MP4, not a Git LFS pointer", async () => {
  const files = (await readdir(videosDirectory)).filter((name) => name.endsWith(".mp4"));
  assert.ok(files.length > 0, "No deployed MP4 files found");

  for (const name of files) {
    const url = new URL(name, videosDirectory);
    const file = await open(url, "r");
    try {
      const header = Buffer.alloc(12);
      await file.read(header, 0, header.length, 0);
      assert.equal(header.toString("ascii", 4, 8), "ftyp", `${name} is not an MP4 file`);
      assert.ok((await stat(url)).size > 1024, `${name} is too small to be playable`);
    } finally {
      await file.close();
    }
  }
});
