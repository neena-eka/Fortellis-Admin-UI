export const fetchEntityInfo = async () => {
    const response = await fetch(`https://f79j2bnnmi.execute-api.us-east-2.amazonaws.com/test/entity-info`);
    const error =
        response.status !== 200
            ? "Information not found"
            : null;

    const message = await response.json();
    console.log(message);
    return !error ? message : error;
};

export const patchEntityInfo = async (requestId, newStatus) => {
    const response = await fetch(`https://f79j2bnnmi.execute-api.us-east-2.amazonaws.com/test/entity-info`, {
        method: 'PATCH',
        'Access-Control-Allow-Methods': 'PATCH',
        body: JSON.stringify({
            id: requestId,
            requestStatus: newStatus
        }),
    });
    const error =
        response.status !== 202
            ? "Patch failed"
            : null;

    const message = await response.text();
    console.log(!error ? message : error);
};

//link for local java microservice
//http://127.0.0.1:8080/admin
