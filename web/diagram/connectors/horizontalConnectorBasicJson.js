define(function() {
  return function() {
    'use strict'

    return {
      orientation: 'horizontal',

      nodes: {
        left: {
          xCood: 100,
          yCood: 100,
          attached: false,
          attachedBox: '',
          arrow: {
            style: 'blackConnectArrow',
            direction: 'left',
          },
        },

        proximal: {
          xCood: 200,
          yCood: 100,
          attached: false,
          attachedBox: '',
        },

        distal: {
          xCood: 200,
          yCood: 300,
          attached: false,
          attachedBox: '',
        },

        right: {
          xCood: 400,
          yCood: 300,
          attached: false,
          attachedBox: '',
          arrow: {
            style: 'whiteArrow',
            direction: 'right',
          },
        },
      },
      lineStyle: 'solid',
    }
  }
})
