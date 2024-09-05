export const calculateNoticeScore = (
  notice: any,
  commentsCount: number,
  reactsCount: number
) => {
  const now = new Date().getTime();
  const postAgeInDays =
    (now - new Date(notice.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  const recencyScore = postAgeInDays ? 1 / postAgeInDays : 1;
  const popularityScore = reactsCount + commentsCount;
  const randomFactor = Math.random() * 0.5;

  return recencyScore + popularityScore + randomFactor;
};
