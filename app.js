document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tgForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const chatId = document.getElementById('chat_id').value;
    const message = document.getElementById('message').value;

    fetch('send_message.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `chat_id=${chatId}&message=${message}`
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
  });
});
