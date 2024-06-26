import { Link } from 'react-router-dom';
import { IoPlayBackOutline } from 'react-icons/io5';
import { getAllUsers, updateUserRole } from '../../../api/user';
import { useState, useEffect } from 'react';

const UserTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [msg, setMsg] = useState(null);

  const handleStatus = (newStatus, id) => {
    updateUserRole(id, { role: newStatus })
      .then((res) => {
        if (res.status === 200) {
          getAllUsers()
            .then((responce) => {
              if (responce.status === 200) {
                console.log(responce);
                setAllUsers(responce.data);
                setMsg(res.msg);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleStatus();
  }, []);

  return (
    <section>
      <h1>Les utilisateurs</h1>
      <div className="retour">
        <IoPlayBackOutline className="Admin__icon" />
        <Link to={'/admin'} className="Admin__links">
          Retour
        </Link>
      </div>
      {msg !== null && <p className="Form__error">{msg}</p>}
      <div>
        <table className="Admin__table user">
          <thead>
            <tr>
              <th>NOM</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 &&
              allUsers.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.lastName}</td>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button
                        className="User__table-btn"
                        onClick={() => handleStatus('admin', item.id)}
                      >
                        Admin
                      </button>
                      <button
                        className="User__table-btn"
                        onClick={() => handleStatus('user', item.id)}
                      >
                        User
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default UserTable;
