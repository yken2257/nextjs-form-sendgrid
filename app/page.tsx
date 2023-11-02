
export default function Home() {
  async function submit(formData: FormData) {
    'use server';
    const headers = new Headers([
      ["Content-Type", "application/json"],
      ["Authorization", "Bearer " + process.env.SENDGRID_API_KEY ]
    ]);
    const requestBody = {
      "personalizations": [
        {
          "to": [
            {
              "email": formData.get("email")
            }
          ]
        }
      ],
      "subject": "お問い合わせを受け付けました。",
      "from": {
        "email": "from@example.com"
      },
      "content": [
        {
          "type": "text/plain",
          "value": "以下の内容でお問い合わせを受け付けました。\r\n" + formData.get("content")
        }
      ]
    };
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: headers
    });
  }
  
  return (
    <div className="max-w-md mx-auto mt-4 bg-white p-6 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">問い合わせフォーム</h1>
      <form action={submit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">メールアドレス</label>
          <input type="email" id="email" name="email" required
            className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-600">お問い合わせ内容</label>
          <textarea id="content" name="content" rows={4} required
            className="mt-1 p-2 w-full border rounded-md"></textarea>
        </div>
        <div>
          <button type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
            送信
          </button>
        </div>
      </form>
    </div>
  )
}
