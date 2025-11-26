import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		// Path to the static/portfolio directory (relative to project root)
		const portfolioPath = join(process.cwd(), 'static', 'portfolio');
		
		// Check if directory exists
		if (!existsSync(portfolioPath)) {
			return new Response(JSON.stringify({ 
				images: [], 
				count: 0,
				success: true,
				message: 'Portfolio directory not found. Add images to /static/portfolio/'
			}), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		
		// Read directory contents
		const files = await readdir(portfolioPath);
		
		// Filter for image files only and check they're actually files (not directories)
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
		const imageFiles = [];
		
		for (const file of files) {
			const filePath = join(portfolioPath, file);
			const fileStat = await stat(filePath);
			
			// Skip if it's a directory or README files
			if (fileStat.isDirectory() || file.toLowerCase() === 'readme.md') {
				continue;
			}
			
			const ext = file.toLowerCase().substring(file.lastIndexOf('.'));
			if (imageExtensions.includes(ext)) {
				imageFiles.push({
					name: file,
					src: `/portfolio/${file}`,
					alt: file.substring(0, file.lastIndexOf('.'))
						.replace(/[-_]/g, ' ')
						.replace(/\b\w/g, l => l.toUpperCase())
				});
			}
		}
		
		// Sort alphabetically
		imageFiles.sort((a, b) => a.name.localeCompare(b.name));

		return new Response(JSON.stringify({ 
			images: imageFiles,
			count: imageFiles.length,
			success: true
		}), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
			}
		});

	} catch (error) {
		console.error('Error reading portfolio directory:', error);
		
		// Return empty array instead of 500 error
		return new Response(JSON.stringify({ 
			images: [], 
			count: 0,
			success: false,
			message: error.message || 'Error reading portfolio directory',
			error: 'Add images to /static/portfolio/ directory'
		}), {
			status: 200, // Return 200 with empty array so page doesn't break
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

