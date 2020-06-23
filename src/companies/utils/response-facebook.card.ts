export function responseCard(
  title: string,
  subtitle: string,
  imageUri: string,
  button: string,
) {
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
