import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../src/Loader/Loader.tsx';
const API_URL = 'http://localhost:3000';
import '../src/style/SignIn.css';
/*eslint-disable*/

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [nickname, setNickName] = useState('');

  const [Thispassword, setThisPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [reallyNew, setReallyNew] = useState('');

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');

      return;
    }

    fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        return data;

      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        // Токен просрочений
        localStorage.removeItem('accessToken');
        navigate('/login');
      });

  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  if (!user) {
    return <Loader />;
  }

  function handleSubmit(event) {
    const token = localStorage.getItem('accessToken');
    event.preventDefault();

    setErrors({});
    setMessage('');
    setIsLoading(true);

    fetch(`${API_URL}/patching`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nickname,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          setErrors(data.errors || { form: data.message });

          return;
        }

        setMessage(data.message);
        setNickName('');
      })
      .catch(() => {
        setErrors({ form: 'Server is not available' });
      })
      .finally(() => setIsLoading(false));
  }


  // passsubmit
  function passwordSubmit(event) {
    const token = localStorage.getItem('accessToken');
    event.preventDefault();

    setErrors({});
    setIsLoading(true);

    fetch(`${API_URL}/patching/parol`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: Thispassword,
        newPassword: newPassword,
        confirmation: reallyNew,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          setErrors(data.errors || { form: data.message });

          return;
        }

        setMessage(data.message);
      })
      .catch(() => {
        setErrors({ form: 'Server is not available' });
      })
      .finally(() => setIsLoading(false));
  }



  return (
    <>
      <div className="SignUp_page">
        <div className="SignUp_page">
          <h1>Profile</h1>

          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <button className="button_Sign" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="Name Sign">Name</p>
          <input
            type="text"
            value={nickname}
            onChange={(event) => setNickName(event.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <button className="button_Sign" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'change'}
          </button>
        </form>


          <form onSubmit={passwordSubmit}>
          <h2>Change Password</h2>
          <p className="password Sign">Write old password here</p>
          <input
            //type='password'
            value={Thispassword}
            onChange={(event) => setThisPassword(event.target.value)}
            required
          />

            <p className="password Sign">here you need to write new pass</p>
            <input
              //type='password'
              value={newPassword}
              onChange={(event) => setnewPassword(event.target.value)}
              required
            />

            <p className="password Sign">here you need to confirm new pass</p>
            <input
              //type='password'
              value={reallyNew}
              onChange={(event) => setReallyNew(event.target.value)}
              required
            />

            {errors.password && (
              <ul>
                {errors.password.map((msg) => (
                  <li key={msg} className="error">{msg}</li>
                ))}
              </ul>
            )}
            <button className="button_Sign" type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'change'}
            </button>
          </form>

        {errors.form && <p className="error">{errors.form}</p>}
        {message && <p className="success">{message}</p>}
      </div>
    </>
  );
}

export default Profile;

