import { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box } from '@chakra-ui/react';

const Index = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttractions = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=${location}&format=json&origin=*`);
      const data = await response.json();
      setResults(data.query.geosearch);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Input
          placeholder="Enter location coordinates (latitude,longitude)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="lg"
        />
        <Button onClick={fetchAttractions} isLoading={loading} colorScheme="blue" size="lg">
          Fetch Attractions
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