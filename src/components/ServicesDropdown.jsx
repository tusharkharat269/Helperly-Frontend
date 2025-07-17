import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import useAuthAxios from '../api/useAuthAxios';

function ServicesDropdown() {
    const [groupedServices, setGroupedServices] = useState({});
    const api = useAuthAxios();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/api/services');
                const services = response.data;

                // Group by category
                const grouped = services.reduce((acc, service) => {
                    if (!acc[service.category]) acc[service.category] = [];
                    acc[service.category].push(service);
                    return acc;
                }, {});

                setGroupedServices(grouped);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <NavDropdown title="Services" id="services-dropdown">
            <NavDropdown.Item href="/all-services" className="text-dark text-center fw-bold">
                🔍 View All Services
            </NavDropdown.Item>
            <NavDropdown.Divider />

            {Object.keys(groupedServices).map((category) => (
                <NavDropdown.Item
                    key={category}
                    href={`/`}
                >
                    {category}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

export default ServicesDropdown;
