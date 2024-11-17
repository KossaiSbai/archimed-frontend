import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/investments/');
    if (!response.ok) {
      throw new Error('Failed to fetch investments');
    }

    const investments = await response.json();

    return {
      statusCode: 200,
      data: investments,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    };
  }
});
