export function getReviewWord(reviews: number) {
  if (reviews % 10 === 1 && reviews % 100 !== 11) {
    return 'отзыв';
  }

  if (reviews % 10 >= 2 && reviews % 10 <= 4 && (reviews % 100 < 10 || reviews % 100 >= 20)) {
    return 'отзыва';
  }

  return 'отзывов';
}
