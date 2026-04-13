const URL_REGEX = /https?:\/\/[^\s]+/g;
const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F004}\u{1F0CF}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{2B05}-\u{2B07}\u{2B1B}\u{2B1C}\u{3297}\u{3299}\u{23F0}\u{23F3}\u{25FD}\u{25FE}\u{23EA}\u{23EB}\u{23EC}\u{23EF}\u{23F8}\u{23F9}\u{23FA}\u{23ED}\u{23EE}\u{23E9}\u{23EA}\u{23EB}\u{23EC}\u{23EF}\u{23F8}\u{23F9}\u{23FA}\u{23ED}\u{23EE}\u{23E9}]/gu;

const URL_WEIGHT = 23;
const EMOJI_WEIGHT = 2;
const NORMAL_CHAR_WEIGHT = 1;

export const calculateTweetLength = (text: string): number => {
    if (!text) {
        return 0;
    }

    let remainingText = text;
    let totalLength = 0;

    const urlMatches = remainingText.match(URL_REGEX) || [];
    urlMatches.forEach((url) => {
        totalLength += URL_WEIGHT;
        remainingText = remainingText.replace(url, "");
    });

    const emojiMatches = remainingText.match(EMOJI_REGEX) || [];
    const emojiCount = emojiMatches.length;
    totalLength += emojiCount * EMOJI_WEIGHT;

    emojiMatches.forEach((emoji) => {
        remainingText = remainingText.replace(emoji, "");
    });

    totalLength += remainingText.length * NORMAL_CHAR_WEIGHT;

    return totalLength;
};

export const getRemainingTweetLength = (text: string, maxLength: number = 280): number => {
    const currentLength = calculateTweetLength(text);
    return maxLength - currentLength;
};

export const isTweetTooLong = (text: string, maxLength: number = 280): boolean => {
    return calculateTweetLength(text) > maxLength;
};

export const getTweetLengthPercent = (text: string, maxLength: number = 280): number => {
    const currentLength = calculateTweetLength(text);
    return Math.min(Math.round((currentLength / maxLength) * 100), 100);
};
