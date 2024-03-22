export const compareImages = async (voterImage, userImage) => {
    const formData = new FormData();
    formData.append('voterImage', voterImage);
    formData.append('userImage', userImage);
    const response = await fetch('http://127.0.0.1:5000/compare', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: formData
    });
    const {matched} = await response.json();
    return matched;
}