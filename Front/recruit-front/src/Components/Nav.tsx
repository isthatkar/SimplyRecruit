import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const Nav = () => {
   
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
            <a className="navbar-brand mb-0 ml-1 h1" href="/">
                <WorkOutlineIcon width="30" height="30" className="d-inline-block align-top" />
                Simply Recruit
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample02"
                aria-controls="navbarsExample02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/login'}>
                                Login
                            </Link>{' '}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={'/register'}>
                                Register
                            </Link>{' '}
                        </li>
                </ul>
               {/*  {token ? (
                    <ul className="navbar-nav justify-content-right">
                        <li className="nav-item mr-1">
                            <Button onClick={(e) => Logout(e)}>Logout</Button>{' '}
                        </li>
                    </ul>
                ) : (
                    ''
                )} */}
            </div>
        </nav>
    );
};

export default Nav;