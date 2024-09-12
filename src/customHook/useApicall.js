import React, { useEffect, useState } from "react";
import axios from 'axios';
import endpoints from '../utils/ApiList/axiosapi.js';
 
export default function useApicall() {
  const [detailData, setDetailData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsResponse, contactResponse] = await Promise.all([
          axios.get(endpoints.detailsApi),
          axios.get(endpoints.contactApi),
        ]);
 
        setDetailData(detailsResponse.data);
        setContactData(contactResponse.data);
        //localStorage.setItem('Session_status', JSON.stringify(detailsResponse.data.session_valid));
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data.session_valid : 'An error occurred');
      }
    };
 
    fetchData();
 
    // Cleanup function to avoid potential memory leaks
    return () => {
      setDetailData([]);
      setContactData([]);
      setError(null);
    };
  }, []);
 
  return { detailData, contactData, error };
}