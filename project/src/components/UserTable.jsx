import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';


import { MdDeleteForever } from "react-icons/md";

import { MdLockOutline } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";


export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    console.log('userId from localStorage:', localStorage.getItem('userId'));

    const isBlocked = localStorage.getItem('isBlocked') === 'true';
    const userId = parseInt(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(res.data);
        } catch (err) {
           if (err.response?.status === 401 || err.response?.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isBlocked');
    window.location.href = '/login';
}

            
else {
                console.error('Failed to fetch users:', err);
            }
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

const toggleSelectAll = () => {
    if (!selectAll) {
        const idsToSelect = users.map(u => u.id); 
        setSelected(idsToSelect);
    } else {
        setSelected([]);
    }
    setSelectAll(!selectAll);
};


    const toggleSelect = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const handleAction = async (action) => {
        const token = localStorage.getItem('token');

        if (!token) {
            window.location.href = '/login';
            return;
        }

        let payload;

        // if (action === 'block' || action === 'unblock') {
        //     payload = {
        //         target_user_ids: selected,
        //     };
        // } else {
        //     payload = {
        //         ids: selected,
        //     };
        // }

        
    if (action === 'block') {
      payload = { blocking_user_id: userId, target_user_ids: selected };
    } else if (action === 'unblock') {
      payload = { unblocking_user_id: userId, target_user_ids: selected };
    } else {
      payload = { ids: selected };
    }
        try {
            const url = `http://127.0.0.1:8000/api/users/${action}`;
            await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await fetchUsers();
            setSelected([]);
            setSelectAll(false);
        }

        catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            else if (err.response?.status === 400) {
                alert(err.response.data.error || 'Invalid request.');
            }

            else if (err.response?.status === 401 || err.response?.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isBlocked');
    window.location.href = '/login';
}

            else {
                console.error(`Action ${action} failed:`, err);
                alert(err.response?.data?.message || 'Action failed.');
            }
        }
    };

    return (
        <div className="container mt-4">

            {!isBlocked && (
                <div className="d-flex gap-2 mb-3">
                    <button className="btn btn-outline-danger" onClick={() => handleAction('block')}> <MdLockOutline /> Block</button>
                    <button className="btn btn-outline-success" onClick={() => handleAction('unblock')}><MdLockOpen /> Unblock</button>
                    <button className="btn btn-outline-dark" onClick={() => handleAction('delete')}><MdDeleteForever /> Delete</button>
                </div>
            )}

            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Last seen</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(user.id)}
                                    onChange={() => toggleSelect(user.id)}
                                />
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={user.avatar || "https://mdbootstrap.com/img/new/avatars/8.jpg"}
                                        alt=""
                                        style={{ width: '45px', height: '45px' }}
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{user.name}</p>
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">{user.jobTitle || 'N/A'}</p>
                                <p className="text-muted mb-0">{user.department || 'N/A'}</p>
                            </td>
                            <td>
                                <span className={`badge rounded-pill d-inline badge-${getStatusColor(user.status)}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                {user.lastLogin
                                    ? `${formatDistanceToNowStrict(parseISO(user.lastLogin), { addSuffix: true })}`
                                    : 'N/A'}
                            </td>

                              {/* <td>
  {user.last_login && user.last_login.date ? (
    <span title={format(new Date(user.last_login.date), 'yyyy-MM-dd HH:mm:ss')}>
      {formatDistanceToNowStrict(new Date(user.last_login.date), { addSuffix: true })}
    </span>
  ) : (
    'N/A'
  )}
</td> */}


                            <td>{user.level || 'N/A'}</td>
                            <td>
                                <button className="btn btn-link btn-sm btn-rounded">Edit</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// 🎨 Helper for badge color
function getStatusColor(status) {
    switch ((status || '').toLowerCase()) {
        case 'active': return 'success';
        case 'onboarding': return 'primary';
        case 'awaiting': return 'warning';
        case 'blocked': return 'danger';
        default: return 'secondary';
    }
}
