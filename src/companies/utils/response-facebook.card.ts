export function responseCard(title, subtitle, imageUri, button) {
  return {
    card: {
      title,
      subtitle,
      imageUri,
      buttons: [
        {
          text: button,
          postback: title,
          //   messanger_extensions: true,
        },
      ],
    },
    platfrom: 'FACEBOOK',
    sendAsMessage: true,
  };
}
