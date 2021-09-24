import React, {  useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReeValidate from "ree-validate";
import classnames from "classnames";
import { useSelector,useDispatch } from "react-redux";
import userActions from '../_actions/user.action';
const EditUser = (props) => {
  const index = props.match.params.id;
  const history = useHistory();
  const _users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const validator = new ReeValidate.Validator({
    name: "required|min:3|alpha_num",
    email: "required|email",
    phone: "required|numeric|digits:10",
    birth_date: "required",
    gender: "required",
  });
  const [user, setUser] = useState({
    id:"",
    name: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: "",
    language: {
      hindi: false,
      english: false,
      gujarati: false,
    },
  });

  let [errors, setErrors] = useState(validator.errors);
  
  useEffect(() => {
    const languages = JSON.parse(_users[index].language);
    _users[index].language = languages; 
    setUser(_users[index]);
  },[])
  const onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let { errors } = validator;
    errors.remove(name);
    setUser({ ...user, [name]: value });
    validator.validate(name, value).then(() => {
      setErrors(errors);
    });
  };

  const getLanguage = (e) => {
    if (!e) {
      errors.add({ field: "language", msg: "Language Field Required any one" });
      setErrors(errors);
    }
    let checked = e.target.checked;
    let name = e.target.name;
    if (checked == true) {
      user.language[name] = checked;
      setUser({ ...user });
    } else {
      user.language[name] = checked;
      setUser({ ...user });
    }
  };
  const validateAndSubmit = (e) => {
    e.preventDefault();
    const { errors } = validator;
    const valid = validator.validateAll(user);
    valid.then((success) => {
      if (success) {
        let languages = JSON.stringify(user.language);
        setUser({ ...user }, (user.language = languages));
        dispatch(userActions.userUpdate(user));
        history.push("/");
      } else {
        let languages = user.language;
        let language = Object.keys(languages).filter((language) => languages[language]);
        if (language.length == 0) {
          errors.add({ field: "language", msg: "Language Field Required any one" });
          setErrors(errors);
          console.log("ERRORS", errors);
        }
      }
    });
  };

  let {
    id,
    name,
    email,
    phone,
    birth_date,
    gender,
    language,
  } = user;
  return (
    <div className="card-body row">
      <div className="col-7">
        <form onSubmit={validateAndSubmit}>
        <div className="form-group">
            <label>ID:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                name="id"
                value={id}
                onChange={onChange}
                disabled
              />
            </div>
          </div>  
          <div
            className={classnames("form-group", {
              error: errors.has("name"),
            })}
          >
            <label>Name:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            {errors.has("name") && (
              <div id="name-error" className="error text-danger" htmlFor="name">
                {errors.first("name")}
              </div>
            )}
          </div>          
          <div
            className={classnames("form-group", {
              error: errors.has("email"),
            })}
          >
            <label>Email:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
          </div>
          {errors.has("email") && (
            <div id="name-error" className="error text-danger" htmlFor="email">
              {errors.first("email")}
            </div>
          )}         
          <div
            className={classnames("form-group", {
              error: errors.has("phone"),
            })}
          >
            <label>Phone:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                data-mask
                name="phone"
                value={phone}
                onChange={onChange}
                placeholder="Phone"
              />
            </div>
          </div>
          {errors.has("phone") && (
            <div id="name-error" className="error text-danger" htmlFor="phone">
              {errors.first("phone")}
            </div>
          )}
          <div
            className={classnames("form-group", {
              error: errors.has("birth_date"),
            })}
          >
            <label>Birthdate:</label>
            <div className="input-group">
              <input
                type="date"
                className="form-control"
                data-inputmask-alias="datetime"
                data-inputmask-inputformat="dd/mm/yyyy"
                data-mask
                name="birth_date"
                value={birth_date}
                onChange={onChange}
              />
            </div>
          </div>
          {errors.has("birth_date") && (
            <div
              id="name-error"
              className="error text-danger"
              htmlFor="birth_date"
            >
              {errors.first("birth_date")}
            </div>
          )}
          <div
            className={classnames("form-group clearfix", {
              error: errors.has("gender"),
            })}
          >
            <label>Gender:</label>
            <div className="icheck-primary d-inline pl-2">
              <input
                type="radio"
                id="Male"
                name="gender"
                onChange={onChange}
                value="male"
                checked={(gender == "male") ? true : false}
              />
              <label htmlFor="Male" className="pl-2">Male</label>
            </div>
            <div className="icheck-primary d-inline pl-2">
              <input
                type="radio"
                id="Female"
                name="gender"
                onChange={onChange}
                value="female"
                checked={(gender == "female") ? true : false}
              />
              <label htmlFor="Female" className="pl-2">Female</label>
            </div>
          </div>
          {errors.has("gender") && (
            <div id="name-error" className="error text-danger" htmlFor="gender">
              {errors.first("gender")}
            </div>
          )}
          <label>Language:</label>
          <div
            className={classnames("form-group clearfix", {
              error: errors.has("language"),
            })}
          >
            <div className="icheck-danger d-inline pl-2">
              <input
                type="checkbox"
                id="hindi"
                name="hindi"
                value="hindi"
                onChange={getLanguage}
                checked={language.hindi}
              />
              <label htmlFor="hindi" className="pl-2">Hindi</label>
            </div>
            <div className="icheck-danger d-inline pl-2">
              <input
                type="checkbox"
                id="english"
                name="english"
                value="english"
                onChange={getLanguage}
                checked={language.english}
              />
              <label htmlFor="english" className="pl-2">English</label>
            </div>
            <div className="icheck-danger d-inline pl-2">
              <input
                type="checkbox"
                id="gujarati"
                name="gujarati"
                value="gujarati"
                onChange={getLanguage}
                checked={language.gujarati}
              />
              <label htmlFor="gujarati" className="pl-2">Gujarati</label>
            </div>            
          </div>
          {errors.has("language") && (
            <div id="name-error" className="error text-danger" htmlFor="language">
              {errors.first("language")}
            </div>
          )}            
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
