import { defineEventHandler, getQuery, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const id = event.context.params.id;
  if (event.node.req.method === 'GET') {
    try {
        console.log('fetching bill for id', id);    
      const response = await fetch(`http://127.0.0.1:8000/bills/${id}/`);
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Failed to fetch bill');
      }
      const bill = await response.json();
      console.log('bill', bill);    
      if (bill) {
        return {
          statusCode: 200,
          data: bill,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Bill not found',
        };
      }
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
