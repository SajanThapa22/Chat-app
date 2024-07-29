// interface FetchOptions extends RequestInit {
//   headers?: Record<string, string>;
// }

// const getToken = (): string | null => {
//   return localStorage.getItem("token");
// };

// const fetchWithAuth = async (
//   url: string,
//   options: FetchOptions = {}
// ): Promise<Response> => {
//   const token = getToken();
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//     ...options.headers,
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });

//   return response;
// };

// interface ApiResponse {
//   // Define the expected structure of the response data here
//   // For example:
//   // id: number;
//   // name: string;
// }

// const fetchData = async (): Promise<void> => {
//   try {
//     const response = await fetchWithAuth(
//       "http://your-backend-url/api/some-endpoint",
//       {
//         method: "GET",
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data: ApiResponse = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching data", error);
//   }
// };

// fetchData();
