import React, {  useState } from "react";
import { useHistory  } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReeValidate from "ree-validate";
import classnames from "classnames";
import userActions from '../_actions/user.action';
const AddUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const validator = new ReeValidate.Validator({
    id:"required|numeric",
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

  let [errors, setErrors] = useState(validator.errors)
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
        dispatch(userActions.userRegister(user));
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
    language,
  } = user;
  return (
    <div className="card-body row">
      <div className="col-7">
        <form onSubmit={validateAndSubmit}>
        <div
            className={classnames("form-group", {
              error: errors.has("id"),
            })}
          >
            <label>ID:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                name="id"
                value={id}
                onChange={onChange}
              />
            </div>
            {errors.has("id") && (
              <div id="name-error" className="error text-danger" htmlFor="id">
                {errors.first("id")}
              </div>
            )}
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
              error: errors.has("birthdate"),
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
          {errors.has("birthdate") && (
            <div
              id="name-error"
              className="error text-danger"
              htmlFor="birthdate"
            >
              {errors.first("birthdate")}
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
              />
              <label htmlFor="Male"className="pl-2">Male</label>
            </div>
            <div className="icheck-primary d-inline pl-2">
              <input
                type="radio"
                id="Female"
                name="gender"
                onChange={onChange}
                value="female"
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
export default AddUser;
