//import showMessages from "../src/lib/chat.js";

import showMessages from "../src/lib/chat.js";

global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(
      {choices: [{message: {content: 'Tengo 37 años'}}]}
    )
  })
);

describe('Se crea un nodo de mensaje por cada respuesta', ()=> {
  const chatContainer = document.createElement('div');  
  const input = document.createElement('input');
  input.value = '¿Qué edad tienes?';
 
  it('Crea un nodo para el mensaje del usuario', async() => {
    await showMessages(input, chatContainer, 'Mark Zuckerberg');
    const userElement = chatContainer.querySelector('.user-message #message')
    expect(userElement).toBeDefined();
    expect(chatContainer.innerHTML).toContain('¿Qué edad tienes?');
    expect(chatContainer.innerHTML).toContain('Mark Zuckerberg');
    expect(chatContainer.innerHTML).toContain('Tengo 37 años');

  });
  
  it('Crea un nodo para el mensaje de error', async() => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: false,
      })
    );
    await showMessages(input, chatContainer, 'Mark Zuckerberg');
    expect(chatContainer.innerHTML).toContain('La solicitud falló');
  })
});