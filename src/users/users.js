import React from "react";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import swal from "sweetalert";
import userActions from "../_actions/user.action";
const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();  
  const onClick = (event) => {
    let id = event.target.id;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(userActions.userDelete(id));
        swal("Poof! Your user has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }; 
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card-body">
            <table className="table table-hover table-responsive">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Birth Date</th>
                  <th>Gneder</th>
                  <th>Language Known</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 && users.map((user,index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.birth_date}</td>
                    <td>{user.gender}</td>
                    <td>{Object.keys(JSON.parse(user.language)).filter(
                          (language) => JSON.parse(user.language)[language]
                        ) + ""}</td>
                    <td> <Link to={`editUser/${index}`} className="btn btn-success">
                          Edit
                          </Link>
                          <button onClick={onClick} id={user.id} className="btn btn-danger">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>      
    </div>
  );
};


export default Users;
