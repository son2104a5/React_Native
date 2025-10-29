// test-api.js - Simple test script to verify API endpoints
const API_BASE_URL = 'http://localhost:8080/api/v1';

async function testAPI() {
  console.log('Testing API endpoints...');
  
  try {
    // Test GET all tasks
    console.log('\n1. Testing GET /tasks');
    const getResponse = await fetch(`${API_BASE_URL}/tasks`);
    const getData = await getResponse.json();
    console.log('GET Response:', getData);
    
    // Test POST create task
    console.log('\n2. Testing POST /tasks');
    const newTask = {
      name: 'Test Task from Mobile App',
      priority: 'MEDIUM',
      status: 'PENDING',
      description: 'This is a test task created from the mobile app'
    };
    
    const postResponse = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    });
    const postData = await postResponse.json();
    console.log('POST Response:', postData);
    
    if (postData.success && postData.data) {
      const taskId = postData.data.id;
      
      // Test PUT update task
      console.log('\n3. Testing PUT /tasks/' + taskId);
      const updatedTask = {
        name: 'Updated Test Task',
        priority: 'HIGH',
        status: 'COMPLETED',
        description: 'This task has been updated'
      };
      
      const putResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
      });
      const putData = await putResponse.json();
      console.log('PUT Response:', putData);
      
      // Test DELETE task
      console.log('\n4. Testing DELETE /tasks/' + taskId);
      const deleteResponse = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      console.log('DELETE Response Status:', deleteResponse.status);
    }
    
    console.log('\n✅ All API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}

// Run the test
testAPI();
