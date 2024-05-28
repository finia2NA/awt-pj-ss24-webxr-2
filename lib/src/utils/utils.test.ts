import { convertDateToUnix } from "./utils";

describe("utils", () => {
    test("Simple check for Unix Epoch", async () => {
        const unixTime = convertDateToUnix(new Date(0));
        expect(unixTime).toBe(0);
    });
});