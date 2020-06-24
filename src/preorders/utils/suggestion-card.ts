export function suggestionOrder(title, ...texts) {
  return [
    {
      quickReplies: {
        title: title,
        quickReplies: [texts],
        platform: 'FACEBOOK',
      },
    },
  ];
}
