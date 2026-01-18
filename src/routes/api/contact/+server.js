import { MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM_EMAIL, MAILGUN_TO_EMAIL } from '$env/static/private';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.name || !data.email || !data.message) {
			return json(
				{ success: false, error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json(
				{ success: false, error: 'Invalid email address' },
				{ status: 400 }
			);
		}

		// Check if Mailgun is configured
		if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_FROM_EMAIL || !MAILGUN_TO_EMAIL) {
			console.error('Mailgun environment variables not configured');
			return json(
				{ success: false, error: 'Email service not configured' },
				{ status: 500 }
			);
		}

		// Build email subject
		const eventTypeLabels = {
			showgirl: 'Showgirl Package',
			gentlemens: "Gentlemen's Package",
			atmosphere: 'Atmosphere Package',
			collab: 'Collab Request',
			other: 'Other'
		};
		const eventType = eventTypeLabels[data.eventType] || 'General Inquiry';
		const subject = `New Contact Form Submission - ${eventType}`;

		// Build email body
		let emailBody = `
New contact form submission from Jordega website:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Event Type: ${eventType}
Event Date: ${data.date || 'Not specified'}

Message:
${data.message}
		`.trim();

		// Prepare form data for Mailgun API
		const formData = new URLSearchParams();
		formData.append('from', MAILGUN_FROM_EMAIL);
		formData.append('to', MAILGUN_TO_EMAIL);
		formData.append('subject', subject);
		formData.append('text', emailBody);
		
		// Also include HTML version for better formatting
		const htmlBody = `
<!DOCTYPE html>
<html>
<head>
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		h2 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
		.field { margin: 15px 0; }
		.label { font-weight: bold; color: #000; }
		.message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #000; margin-top: 15px; }
	</style>
</head>
<body>
	<h2>New Contact Form Submission</h2>
	<div class="field">
		<span class="label">Name:</span> ${data.name}
	</div>
	<div class="field">
		<span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
	</div>
	<div class="field">
		<span class="label">Phone:</span> ${data.phone || 'Not provided'}
	</div>
	<div class="field">
		<span class="label">Event Type:</span> ${eventType}
	</div>
	<div class="field">
		<span class="label">Event Date:</span> ${data.date || 'Not specified'}
	</div>
	<div class="message-box">
		<strong>Message:</strong><br><br>
		${data.message.replace(/\n/g, '<br>')}
	</div>
</body>
</html>
		`.trim();
		
		formData.append('html', htmlBody);

		// Reply-to header so you can reply directly to the customer
		formData.append('h:Reply-To', data.email);

		// Send email via Mailgun API
		const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
		
		const response = await fetch(mailgunUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')}`
			},
			body: formData
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Mailgun API error:', response.status, errorText);
			return json(
				{ success: false, error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		const result = await response.json();
		
		return json({
			success: true,
			message: 'Email sent successfully',
			id: result.id
		});

	} catch (error) {
		console.error('Contact form error:', error);
		return json(
			{ success: false, error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

