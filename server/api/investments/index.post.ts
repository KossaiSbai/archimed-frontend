import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    try {
      const body = await readBody(event);
      console.log('Inserting new investment:', body);

      const response = await fetch('http://127.0.0.1:8000/investments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to insert investment');
      }

      const investment = await response.json();

      return {
        statusCode: 201,
        data: investment,
        message: 'Investment inserted successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  } else {
    return {
      statusCode: 405,
      message: 'Method not allowed',
    };
  }
});
