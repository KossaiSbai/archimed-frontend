import { defineEventHandler, getQuery, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const id = event.context.params.id;
  if (event.node.req.method === 'GET') {
    try {
        console.log('fetching capital call for id', id);    
      const response = await fetch(`http://127.0.0.1:8000/capital_calls/${id}/`);
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Failed to fetch bill');
      }
      const capital_call = await response.json();
      console.log('capital call', capital_call);    
      if (capital_call) {
        return {
          statusCode: 200,
          data: capital_call,
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
