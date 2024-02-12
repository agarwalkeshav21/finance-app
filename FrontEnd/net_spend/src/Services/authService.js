
export async function loginUser(credentials) {
  try {
      // Replace 'http://localhost:8082/api/auth/login' with your actual login API endpoint
      const response = await fetch('http://localhost:8082/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
      });
      if (!response.ok) {
          throw new Error('Login failed');
      }
      const data = await response.json();
      // Save the token in localStorage or manage the session as required
      localStorage.setItem('userToken', data.token);
      return data.user; // Assuming your API responds with a user object and a token
  } catch (error) {
      console.error('Login error:', error);
      throw error;
  }
}
export async function getCurrentUser() {
    try {
        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch('http://localhost:8082/api/auth/current_user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const rawResponse = await response.text(); // Get raw response body as text
        console.log("Raw server response:", rawResponse); // Log it for debugging

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        
        const user = JSON.parse(rawResponse); // Manually parse the text as JSON
        return user;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}
