import { defineEventHandler, readBody, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  if (event.node.req.method === 'POST') {
    try {
      const body = await readBody(event);
      console.log('Inserting new bill:', body);

      const response = await fetch('http://127.0.0.1:8000/create_bill/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to insert bill');
      }

      const bill = await response.json();
      return {
        statusCode: 201,
        data: bill,
        message: 'Bill inserted successfully',
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
