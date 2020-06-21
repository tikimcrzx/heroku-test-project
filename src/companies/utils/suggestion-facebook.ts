export function responseSuggestion() {
  return [
    {
      card: {
        buttons: [
          {
            text: 'Seguir Ordenando',
            postback: 'si',
          },
        ],
      },
    },
    {
      card: {
        buttons: [
          {
            text: 'Terminar Orden',
            postback: 'no',
          },
        ],
      },
    },
  ];
}
