import { create } from 'zustand';

const useCustomerStore = create((set, get) => ({
    customers: [],
    loading: false,
    error: null,
    
    fetchCustomers: async () => {
        set({ loading: true, error: null });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/customers', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error('Müşteriler alınamadı');
            }
            const data = await response.json();
            set({ customers: data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    addCustomer: async (customerData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(customerData)
            });
            if (!response.ok) {
                throw new Error('Müşteri eklenemedi');
            }
            const newCustomer = await response.json();
            // Fetch customers again to get the most up-to-date list
            get().fetchCustomers();
            return newCustomer;
        } catch (error) {
            console.error(error);
            // Optionally set an error state
            set({ error: error.message });
        }
    },

    updateCustomer: async (customerId, customerData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/customers/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(customerData)
            });
            if (!response.ok) {
                throw new Error('Müşteri güncellenemedi');
            }
            // Update the local state instead of re-fetching everything
            set(state => ({
                customers: state.customers.map(c => c.id === customerId ? { ...c, ...customerData } : c)
            }));
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        }
    },
    
    archiveCustomer: async (customerId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/customers/${customerId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error('Müşteri arşivlenemedi');
            }
            // Remove the customer from the local state
            set(state => ({
                customers: state.customers.filter(c => c.id !== customerId)
            }));
        } catch (error) {
            console.error(error);
            set({ error: error.message });
        }
    },
}));

export default useCustomerStore;
