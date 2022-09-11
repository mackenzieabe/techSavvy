async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const post_text = document.querySelector('#post-url').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard')

}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);