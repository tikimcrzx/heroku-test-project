export function suggestionOrder() {
  return {
    payload: {
      platform: 'facebook',
      type: 2,
      replies: ['Order', 'Solorno', 'Samantano'],
    },
  };

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
      platform: 'FACEBOOK',
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
