import React, { useEffect } from "react";
import { Container, Tabs, Tab, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));



  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome, {user.name}</h3>
        <Button variant="outline-dark" onClick={handleLogout}>
          Logout
        </Button>
      </div>

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
