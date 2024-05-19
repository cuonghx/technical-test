import { mergeOverlappingArray, Item } from "../index";

describe("merge overlapping array is failed", () => {
  it("throws an error when input array is invalid", () => {
    const input = [
      { startPx: 10, endPx: 0 },
      { startPx: 30, endPx: 40 },
    ];
    expect(() => mergeOverlappingArray(input)).toThrow("Invalid input");
  });
});

describe("merge overlapping array is success", () => {
  it("should handle non-overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 30, endPx: 40 },
    ];
    const output = [
      { startPx: 10, endPx: 20 },
      { startPx: 30, endPx: 40 },
    ];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should merge completely overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 30 },
      { startPx: 20, endPx: 40 },
    ];
    const output = [{ startPx: 10, endPx: 40 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should merge partially overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 15, endPx: 25 },
    ];
    const output = [{ startPx: 10, endPx: 25 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should merge multiple overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 15, endPx: 25 },
      { startPx: 30, endPx: 35 },
      { startPx: 33, endPx: 40 },
    ];
    const output = [
      { startPx: 10, endPx: 25 },
      { startPx: 30, endPx: 40 },
    ];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should handle single item", () => {
    const input = [{ startPx: 10, endPx: 20 }];
    expect(mergeOverlappingArray(input)).toEqual(input);
  });
  it("should handle empty array", () => {
    const input = [] as Item[];
    expect(mergeOverlappingArray(input)).toEqual(input);
  });
  it("should merge all overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 15, endPx: 25 },
      { startPx: 18, endPx: 30 },
    ];
    const output = [{ startPx: 10, endPx: 30 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should merge adjacent items", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 20, endPx: 30 },
    ];
    const output = [{ startPx: 10, endPx: 30 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should sort and merge unsorted items", () => {
    const input = [
      { startPx: 20, endPx: 30 },
      { startPx: 10, endPx: 15 },
      { startPx: 15, endPx: 25 },
    ];
    const output = [{ startPx: 10, endPx: 30 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should handles mix of overlapping and non-overlapping items", () => {
    const input = [
      { startPx: 10, endPx: 30 },
      { startPx: 55, endPx: 65 },
      { startPx: 35, endPx: 50 },
      { startPx: 20, endPx: 40 },
      { startPx: 60, endPx: 70 },
    ];
    const output = [
      { startPx: 10, endPx: 50 },
      { startPx: 55, endPx: 70 },
    ];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should merge items with exact overlap", () => {
    const input = [
      { startPx: 10, endPx: 20 },
      { startPx: 10, endPx: 20 },
    ];
    const output = [{ startPx: 10, endPx: 20 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should handle negative values in item", () => {
    const input = [
      { startPx: -10, endPx: -5 },
      { startPx: -20, endPx: -15 },
      { startPx: -25, endPx: -10 },
    ];
    const output = [{ startPx: -25, endPx: -5 }];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
  it("should handle single point items", () => {
    const input = [
      { startPx: 10, endPx: 10 },
      { startPx: 20, endPx: 20 },
      { startPx: 15, endPx: 15 },
    ];
    const output = [
      { startPx: 10, endPx: 10 },
      { startPx: 15, endPx: 15 },
      { startPx: 20, endPx: 20 },
    ];
    expect(mergeOverlappingArray(input)).toEqual(output);
  });
});
