const UPSTASH_ENDPOINT = import.meta.env.VITE_REDIS_URL;
const UPSTASH_AUTH_TOKEN = import.meta.env.VITE_REDIS_TOKEN;
   

export const set_redis = async (restaurant_name, card, link, ttl) => {
    console.log(restaurant_name, card, link);
    
    const key = `${restaurant_name}_${card}`;
    const value = encodeURIComponent(link); 
    
    try {
        console.log('beared token', UPSTASH_AUTH_TOKEN);

        let url = `${UPSTASH_ENDPOINT}/set/${key}/${value}`;
        // Add TTL to URL if restaurant name is "XOPP"
        if (restaurant_name === "XOPP") {
            url += `/EX/${ttl}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${UPSTASH_AUTH_TOKEN}`
            },
        });
        
        const data = await response.json();
        console.log("Succesfully set the key", key ,data);
    } catch (error) {
        console.error('Error:', error);
    }
};


export const get_redis = async (restaurant_name, card) => {
    const key = `${restaurant_name}_${card}`;

    try {
        const response = await fetch(`${UPSTASH_ENDPOINT}/get/${key}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${UPSTASH_AUTH_TOKEN}`
            }
        });
        
        const data = await response.json();
        return data.value ? decodeURIComponent(data.value) : null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};