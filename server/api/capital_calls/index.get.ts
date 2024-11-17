import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    // Fetch all capital calls from the external API
    const response = await fetch('http://127.0.0.1:8000/capital_calls/');

    // Check if the API call was successful
    if (!response.ok) {
      throw new Error('Failed to fetch capital calls');
    }

    // Parse the response JSON
    const capitalCalls = await response.json();

    // Return the data with a 200 status code
    return {
      statusCode: 200,
      data: capitalCalls,
    };
  } catch (error) {
    // Handle any errors that occur during the API call
    return {
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    };
  }
});
