import { test, expect } from '@playwright/test';

test('check duplicate items between two lists', async () => {
  const listA  = [1, 2, 3, 5, 6, 8, 9];
  const listB = [3, 2, 1, 5, 6, 0];

  const duplicates = listA.filter(item => listB.includes(item));

  console.log(duplicates);

  expect(duplicates).toEqual([1, 2, 3, 5, 6]);
});