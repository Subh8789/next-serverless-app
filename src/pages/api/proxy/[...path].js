import endpoints from '../../../utils/ApiList/axiosapi'; // Adjust the path based on your folder structure

export default async (req, res) => {
  const { method, headers, body } = req;
  const { path } = req.query; // path is an array of path segments
  const targetPath = Array.isArray(path) ? path.join('/') : ''; // Join path segments into a single string

  // Map path to target URL
  const targetURL = endpoints[targetPath];

  if (!targetURL) {
    res.status(404).json({ error: 'Endpoint not found' });
    return;
  }

  // Handle CORS preflight request
  if (method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  // Extract cookies and token
  const cookies = headers.cookie ? parseCookies(headers.cookie) : {};
  const token = cookies['2391-token'] || 'ewogICJ0eXAiIDogIkpXVCIsCiAgImFsZyIgOiAiUlMyNTYiCn0.ewogICJkb21haW4iIDogIjIzOTEiLAogICJhcHBJZCIgOiAiMjM5IiwKICAiaXNzIiA6ICJidWlsZGluZ3NidC5zdGFnZS5ob25leXdlbGwuY29tIiwKICAianRpIiA6ICI5ZTc1MmNhYy1hMGZiLTQ3YWQtYTg2MS0wODQ5M2VkNWY5M2UiLAogICJzdWIiIDogIjg1NGM0NWFmLTA0OGItNGRkNC04MWExLTcxNWZkYmFlNzIzZSIsCiAgImlhdCIgOiAxNzI2MTQ5NTMzLAogICJleHAiIDogMTcyNjE1MTMzMwp9.0iI3sm2MFCknM3lTwg9HLyyWbRNDLhblegffx1cJa7JoqGBmBfCVjVnQVHO7SRJC5nKd-5seQ7DHh3LKo4pJp9eGC0LewTyKrucCHnB0J4iYWb8_rYMjAWuT_hfePHoAz2YOr92jVxV3fL1MX-WPCV9xI7unQdqL2Mi-uHHPvo0AlNJ_OZqcaXQbCL_FGK5KDE1Y1IJUvD-pr4bCI6zERYq6kTT9pm4frMKhRLRmha81y7qQdbt_VBrK8eSE2MuOSTRqGCXgJNvf2gqs7pkVFQP4LX-0x1KnB_1vqa5kgFN9PXXtXbDGMlDqggBPZZLo9ScfEsHh4YXZKMpf8LMxQg';

  // Set up request options
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Cookie': `2391-token=${token}`,
      'Content-Type': 'application/json',
      ...headers, // Forward other headers as necessary
    },
    body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : undefined,
  };

  try {
    // Perform the proxy request
    const response = await fetch(targetURL, options);
    const responseData = await response.json();

    res.status(response.status).json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Utility function to parse cookies
const parseCookies = (cookieString) => {
  return cookieString
    .split(';')
    .map(cookie => cookie.trim())
    .reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
};
