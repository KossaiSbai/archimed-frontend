import { defineEventHandler, H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const id = event.context.params.id;
    if (event.node.req.method === 'PUT') {
        try {
            const body = await readBody(event)
            console.log('updating bill for id', id, 'with data', body);
            const response = await fetch(`http://127.0.0.1:8000/bills/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            console.log('response', response);
            if (!response.ok) {
                throw new Error('Failed to update bill');
            }
            const updatedBill = await response.json();
            console.log('updated bill', updatedBill);
            return {
                statusCode: 200,
                data: updatedBill,
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