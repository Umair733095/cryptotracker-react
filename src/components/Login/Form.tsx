import Style from "./Form.module.css";
import { useState, ChangeEvent, FormEvent } from "react";

// Define the shape of form data
interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  country: string;
  termAccepted: boolean;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    country: "",
    termAccepted: false,
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      name: "",
      email: "",
      age: "",
      gender: "",
      country: "",
      termAccepted: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "40px", fontSize: "xx-large" }}>
          Registration Form
        </h1>
        <label className={Style.labeling} htmlFor="name">
          Full Name:{" "}
        </label>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          value={formData.name}
        />
        <br />
        <label className={Style.labeling} htmlFor="email">
          Email:{" "}
        </label>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          value={formData.email}
        />
        <br />
        <label className={Style.labeling} htmlFor="age">
          Age:{" "}
        </label>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="number"
          id="age"
          name="age"
          value={formData.age}
        />
        <br />
        <label className={Style.labeling}>Gender: </label>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
        />
        <span> Male </span>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
        />
        <span> Female</span>
        <br />
        <label className={Style.labeling} htmlFor="country">
          Country
        </label>
        <select
          name="country"
          id="country"
          onChange={handleChange}
          style={{ color: "purple" }}
          value={formData.country}
        >
          <option value="">--Select--</option>
          <option value="Pakistan">Pakistan</option>
          <option value="india">India</option>
          <option value="usa">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
        </select>
        <br />
        <label className={Style.labeling} htmlFor="terms">
          Terms:{" "}
        </label>
        <input
          style={{ border: "1px solid rgb(215, 157, 80)" }}
          onChange={handleChange}
          type="checkbox"
          name="termAccepted"
          id="terms"
          checked={formData.termAccepted}
        />
        <p style={{ display: "inline-block", marginLeft: "8px" }}>
          I agree to the terms and conditions
        </p>
        <br />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit Form
        </button>
      </form>

      {submittedData && (
        <>
          <h2
            style={{
              marginTop: "40px",
              marginBottom: "40px",
              fontSize: "xx-large",
            }}
          >
            Submitted Form
          </h2>
          <table>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>
                Full Name
              </td>
              <td className={Style.cellStyle}>{submittedData.name}</td>
            </tr>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>
                Email
              </td>
              <td className={Style.cellStyle}>{submittedData.email}</td>
            </tr>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>Age</td>
              <td className={Style.cellStyle}>{submittedData.age}</td>
            </tr>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>
                Gender
              </td>
              <td className={Style.cellStyle}>{submittedData.gender}</td>
            </tr>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>
                Country
              </td>
              <td className={Style.cellStyle}>{submittedData.country}</td>
            </tr>
            <tr>
              <td className={`${Style.cellStyle} ${Style.cellHeading}`}>
                Terms Accepted
              </td>
              <td className={Style.cellStyle}>
                {submittedData.termAccepted ? "Yes" : "No"}
              </td>
            </tr>
          </table>
        </>
      )}
    </>
  );
}
