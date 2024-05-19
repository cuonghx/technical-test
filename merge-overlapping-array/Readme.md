### Problem Statement

Write a function (using ES6) that union all overlapping items and produces an array of non-overlapping items.

```
For example:
input = [ { startPx: 10, endPx: 30 }, { startPx: 20, endPx: 40 }]
output = [{ startPx: 10, endPx: 40 }]
```

### Solution

Let's take some examples to illustrate all possible scenarios for this problem:


1. A = { startPx: 10, endPx: 30 }, B = { startPx: 40, endPx: 50 }

   => A and B do not overlap => Do not merge them.

2. A = { startPx: 10, endPx: 30 }, B = { startPx: 20, endPx: 40 }

   => some part of B overlaps with A => Merge them into a new item from A.startPx to B.endPx.

3. A = { startPx: 10, endPx: 30 }, B = { startPx: 15, endPx: 20 }

   => A fully overlaps B => Merge them into a new item from A.startPx to A.endPx.

4. A = { startPx: 10, endPx: 30 }, B = { startPx: 10, endPx: 40 }

   => B fully overlaps A but both have the same start point => Merge them into a new item from B.startPx to B.endPx.


This is my algorithm to deal with this problem:

1. Sort the input array by the start point to ensure A.startPx < B.startPx.
2. If "A overlap B" (like in Example 2), merge them into a new item C such that:

```
C.startPx = A.startPx
C.endPx = max(A.endPx, B.endPx)
```

3. Repeat the above two steps to merge C with the next item if it overlaps with C.

### Implement

- src/index.ts

### Test cases:

`npm run test`

- throws an error when input array is invalid
- should handle non-overlapping items
- should merge completely overlapping items
- should merge partially overlapping items
- should merge multiple overlapping items
- should handle single item
- should handle empty array
- should merge all overlapping items
- should merge adjacent items
- should sort and merge unsorted items
- should handles mix of overlapping and non-overlapping items
- should merge items with exact overlap
- should handle negative values in item
- should handle single point items

#### Time Complexity

The time complexity of the algorithm is O(N _ logN), where 'N' is the total number of items in the array. We sort the array first, which takes O(N _ logN), and then iterate through the array once, which takes O(N).

#### Space Complexity

The space complexity of the algorithm is O(N) because we need to return a list containing all the merged items. We also need O(N) space for sorting. Therefore, the overall space complexity is O(N).
