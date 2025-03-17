import React, { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    // Simulate fetching users from an API
    const fetchUsers = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/admin/users');
        // setUsers(response.data);
        
        // For now, we'll use mock data
        setTimeout(() => {
          setUsers([
            {
              _id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              role: 'admin',
              status: 'active',
              lastLogin: '2023-03-20 10:30 AM',
              registeredDate: '2023-01-15'
            },
            {
              _id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              role: 'user',
              status: 'active',
              lastLogin: '2023-03-19 03:45 PM',
              registeredDate: '2023-01-20'
            },
            {
              _id: '3',
              name: 'Bob Johnson',
              email: 'bob@example.com',
              role: 'user',
              status: 'active',
              lastLogin: '2023-03-18 11:15 AM',
              registeredDate: '2023-02-05'
            },
            {
              _id: '4',
              name: 'Alice Brown',
              email: 'alice@example.com',
              role: 'user',
              status: 'inactive',
              lastLogin: '2023-03-10 09:20 AM',
              registeredDate: '2023-02-10'
            },
            {
              _id: '5',
              name: 'Charlie Wilson',
              email: 'charlie@example.com',
              role: 'moderator',
              status: 'active',
              lastLogin: '2023-03-21 02:10 PM',
              registeredDate: '2023-02-15'
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handleStatusToggle = (userId) => {
    // In a real app, you would update the user status via API
    // axios.put(`/api/admin/users/${userId}/status`)
    //   .then(response => {
    //     // Update the user in the state
    //   })
    //   .catch(error => {
    //     console.error('Error updating user status:', error);
    //   });
    
    // For now, we'll just update the local state
    setUsers(users.map(user => {
      if (user._id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Manage Users</h1>
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>
          Add New User
        </button>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge bg-${
                          user.role === 'admin' ? 'danger' : 
                          user.role === 'moderator' ? 'warning' : 
                          'info'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={user.status === 'active'}
                            onChange={() => handleStatusToggle(user._id)}
                          />
                          <label className="form-check-label">
                            {user.status === 'active' ? 'Active' : 'Inactive'}
                          </label>
                        </div>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>{user.registeredDate}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary">
                            Edit
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span className="visually-hidden">Toggle Dropdown</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Reset Password
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                View Orders
                              </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <a className="dropdown-item text-danger" href="#">
                                Delete User
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <nav aria-label="Users pagination">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 