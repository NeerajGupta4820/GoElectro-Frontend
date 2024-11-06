import React, { useEffect } from 'react';

const BarChart = () => {

    const [allUsers, { isLoading, isError, error }] = useAllUsersMutation();
    console.log(allUsers);

    
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await allUsers().unwrap();
        // setUsers(result.users);
        console.log(result);
        
      } catch (err) {
        console.log(err)
        // toast.error('Fai led to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, [allUsers]);

    
    return (
        <div>
            bar chart
        </div>
    );
};

export default BarChart;