const loginAPI = async (username, password) => {
    try {
      let response = await fetch('https://bookstorewebdeploy-production.up.railway.app/BookStore/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        let errorData = await response.json();
        return { status: response.status, data: errorData };
      }
  
      let data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error:', error);
      return { status: 500, data: { error: 'Something went wrong, please try again later.' } };
    }
  };
  
  export default loginAPI;
  