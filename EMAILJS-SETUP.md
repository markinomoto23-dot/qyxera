# QYXERA Branded Inquiry Email — EmailJS Setup

The QYXERA website is now ready for a fully branded email template.
Until the three EmailJS IDs are added, the contact form automatically keeps using the existing FormSubmit setup, so the live form does not break.

## 1. Create / open EmailJS
Create an EmailJS account and connect the Gmail inbox that should receive the inquiries.

## 2. Create an email service
Copy the **Service ID**.

## 3. Create an email template
Create a new EmailJS template and switch the template editor to HTML/source mode.
Copy everything from:

`EMAILJS-TEMPLATE-QYXERA.html`

Paste it into the EmailJS email template body.

Recommended settings:
- **To Email:** `markchristiandiaz3@gmail.com`
- **From Name:** `QYXERA Website`
- **Reply To:** `{{reply_to}}`
- **Subject:** `{{subject}}`

Save the template and copy its **Template ID**.

## 4. Copy your Public Key
In EmailJS, open Account / API Keys and copy the Public Key.

## 5. Add the IDs to the website
Open `email-config.js` and fill in:

```js
window.QYXERA_EMAILJS = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID'
};
```

## 6. Test
Deploy to Vercel, submit the Contact form, and check Gmail.
Once the EmailJS IDs are present, the website automatically sends through the branded QYXERA template instead of FormSubmit.

## Template variables sent by the website
- `{{subject}}`
- `{{from_name}}`
- `{{from_email}}`
- `{{reply_to}}`
- `{{service}}`
- `{{message}}`
- `{{submitted_at}}`
- `{{site_url}}`
