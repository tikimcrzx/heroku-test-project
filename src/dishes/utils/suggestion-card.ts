export function suggestionOrder() {
  return [
    {
      card: {
        title: 'Ordenar',
        subtitle: 'Ordenar',
        buttons: [
          {
            text: 'Ordenar',
            postback: 'title',
            //   messanger_extensions: true,
          },
        ],
      },
      platfrom: 'FACEBOOK',
      sendAsMessage: true,
    },
    {
      card: {
        title: 'Ordenar',
        subtitle: 'Ordenar',
        buttons: [
          {
            text: 'Ordenar',
            postback: 'title',
            //   messanger_extensions: true,
          },
        ],
      },
      platfrom: 'FACEBOOK',
      sendAsMessage: true,
    },
  ];
}

//https://developers.facebook.com/docs/messenger-platform/send-messages/template/button
