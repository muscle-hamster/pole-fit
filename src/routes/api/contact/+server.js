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

		// Log the form submission (you can implement your own email service here)
		console.log('Contact form submission:', {
			name: data.name,
			email: data.email,
			phone: data.phone,
			eventType: data.eventType,
			date: data.date,
			message: data.message
		});
		
		return json({
			success: true,
			message: 'Message received successfully'
		});

	} catch (error) {
		console.error('Contact form error:', error);
		return json(
			{ success: false, error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

