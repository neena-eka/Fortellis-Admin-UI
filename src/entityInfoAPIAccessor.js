export const fetchEntityInfo = async () => {
    const response = await fetch(`http://api-int.dit.connectcdk.com/api/fo-dc-fortellisadmin-api/v1/admin/requests`);
    const error =
        response.status !== 200
            ? "Information not found"
            : null;

    const message = await response.json();
    return !error ? message : error;
};

export const patchEntityInfo = async (requestId, newStatus) => {
    const response = await fetch(`http://127.0.0.1:8080/admin/update-request`, {
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
