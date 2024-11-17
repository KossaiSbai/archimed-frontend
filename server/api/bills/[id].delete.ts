import { defineEventHandler, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const id = event.context.params.id;
    if (event.node.req.method === 'DELETE') {
        try {
            console.log('deleting bill for id', id);
            const response = await fetch(`http://127.0.0.1:8000/bills/${id}/`, {
                method: 'DELETE',
            });
            console.log('response', response);
            if (!response.ok) {
                throw new Error('Failed to delete bill');
            }
            return {
                statusCode: 200,
                message: 'Bill deleted successfully',
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