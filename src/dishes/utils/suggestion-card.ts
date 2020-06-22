export function suggestionOrder() {
  return [
    {
      quickReplies: {
        title: 'Seguir Ordenando',
        quickReplies: ['Si', 'No'],
        platform: 'FACEBOOK',
      },
    },
  ];

  return [
    {
      messages: [
        {
          platform: 'google',
          suggestions: [
            {
              title: 'Chip One',
            },
            {
              title: 'Chip Two',
            },
          ],
          type: 'suggestion_chips',
        },
      ],
    },
  ];

  //https://www.youtube.com/watch?v=ueVX-p05378

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
