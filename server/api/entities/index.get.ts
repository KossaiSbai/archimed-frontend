import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/entities/');
    if (!response.ok) {
      throw new Error('Failed to fetch entities');
    }

    const entities = await response.json();

    return {
      statusCode: 200,
      data: entities,
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Internal server error',
      error: error.message,
    };
  }
});
