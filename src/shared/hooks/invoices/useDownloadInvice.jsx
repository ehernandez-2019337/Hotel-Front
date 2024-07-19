import { useState } from 'react';
import { downloadInvoiceRequest } from '../../../services/api'; // Importa la función que creamos anteriormente
import toast from 'react-hot-toast'

const useInvoiceDownloader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const downloadInvoice = async (reservationId) => {
        try {
            setLoading(true)
            setError(null)
            await downloadInvoiceRequest(reservationId);
            toast.success('Invoice downloaded successfully') 
        } catch (error) {
            setError(error)
            toast.error('Error downloading the invoice') 
        } finally {
            setLoading(false)
        }
    }

    return { downloadInvoice, loading, error }
}

export default useInvoiceDownloader;
