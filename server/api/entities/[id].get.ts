import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id; // Extract ID from the request context

  try {
    // Fetch the specific entity by ID from the backend API
    const response = await fetch(`http://127.0.0.1:8000/entities/${id}/`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch entity with ID: ${id}`);
    }

    // Parse the JSON response
    const entity = await response.json();

    // Return the entity data with a 200 status code
    return {
      statusCode: 200,
      data: entity,
    };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    };
  }
});
