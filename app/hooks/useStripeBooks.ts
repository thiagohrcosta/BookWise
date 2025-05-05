import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useStripeBooks() {
  return useQuery({
    queryKey: ['stripe-books'],
    queryFn: async () => {
      const response = await axios.get('/api/stripe-books');
      return response.data.books;
    },
  });
}