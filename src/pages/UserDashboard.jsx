import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
import useAuthAxios from '../api/useAuthAxios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL
// });

function UserDashboard() {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { authData } = useContext(AuthContext);

  const authAxios = useAuthAxios();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {

        const response = await authAxios.get("/user/userInfo");

        // console.log(authData.token);
        // const response = await axios.get('http://localhost:8080/user/userInfo', {
        //   headers: {
        //     Authorization: `Bearer ${authData.token}`
        //   }
        // });

        // console.log(response.data)
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError(err.response?.data?.message || 'Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="py-5">

      <Tabs defaultActiveKey="profile" className="mb-3">
        <Tab eventKey="profile" title="My Profile">
          <Card className="p-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.contactNo}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </Card>
        </Tab>

        <Tab eventKey="bookings" title="My Bookings">
          <Card className="p-3">
            <p><strong>Service:</strong> AC Repair</p>
            <p><strong>Status:</strong> Confirmed</p>
            <p><strong>Date:</strong> 10th July 2025</p>
          </Card>
        </Tab>

        <Tab eventKey="payments" title="Payments">
          <Card className="p-3">
            <p><strong>Last Payment:</strong> ₹450 on 03 July 2025</p>
            <p><strong>Mode:</strong> UPI</p>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default UserDashboard;
