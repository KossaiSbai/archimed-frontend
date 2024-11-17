import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id; // Extract ID from the request context

  try {
    // Fetch the specific investment by ID from the backend API
    const response = await fetch(`http://127.0.0.1:8000/investments/${id}/`);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch investment with ID: ${id}`);
    }

    // Parse the JSON response
    const investment = await response.json();

    // Return the investment data with a 200 status code
    return {
      statusCode: 200,
      data: investment,
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
