import React, { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box } from '@chakra-ui/react';
import axios from 'axios';

const Index = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLocationData = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=${location}&format=json&origin=*`);
      setResults(response.data.query.geosearch);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" mb={4}>Explore Nearby Sites</Text>
        <Input
          placeholder="Enter location coordinates (latitude,longitude)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="lg"
        />
        <Button onClick={fetchLocationData} colorScheme="blue" isLoading={loading}>
          Search
        </Button>
        {error && <Text color="red.500">{error}</Text>}
        <Box width="100%" mt={4}>
          {results.map((item, index) => (
            <Box key={index} p={4} shadow="md" borderWidth="1px">
              <Text fontWeight="bold">{item.title}</Text>
              <Text>Distance: {item.dist} meters</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;