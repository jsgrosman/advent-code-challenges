// test/advent21.spec.js

import { swapLettersByLetter, swapLettersByPosition, reverseBetween, rotateStringLeft, rotateStringRight, moveLetterToPosition, rotateStringBasedOnX } from "../advent21-functions";

test('Test swapLettersByPosition', () => {
  expect(swapLettersByPosition(4,0,'abcde')).toBe('ebcda');
});

test('Test swapLettersByPosition', () => {``
  expect(swapLettersByLetter('d','b','ebcda')).toBe('edcba');
});

test('Test reverse', () => {
  expect(reverseBetween(0,4,'edcba')).toBe('abcde');
});

test('Test swapLettersByPosition', () => {
  expect(moveLetterToPosition(1,4,'bcdea')).toBe('bdeac');
});

test('Test swapLettersByPosition 2', () => {
  expect(moveLetterToPosition(3,0,'bdeac')).toBe('abdec');
});

test('rotate left',() => {
  expect(rotateStringLeft(1,'abcde')).toBe('bcdea');
});

test('rotate by char', () => {
  expect(rotateStringBasedOnX('b','abdec')).toBe('ecabd');
});

test('rotate by char 2', () => {
  expect(rotateStringBasedOnX('d','ecabd')).toBe('decab');
});