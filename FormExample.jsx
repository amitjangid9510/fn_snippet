import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./validationSchema";

export default function FormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted! Check console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Username */}
      <div>
        <label>Username</label>
        <input type="text" {...register("username")} />
        <p>{errors.username?.message}</p>
      </div>

      {/* Email */}
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>

      {/* Age */}
      <div>
        <label>Age</label>
        <input type="number" {...register("age")} />
        <p>{errors.age?.message}</p>
      </div>

      {/* Gender (Radio) */}
      <div>
        <label>Gender</label>
        <label>
          <input type="radio" value="male" {...register("gender")} /> Male
        </label>
        <label>
          <input type="radio" value="female" {...register("gender")} /> Female
        </label>
        <p>{errors.gender?.message}</p>
      </div>

      {/* Terms Checkbox */}
      <div>
        <label>
          <input type="checkbox" {...register("terms")} /> Accept Terms
        </label>
        <p>{errors.terms?.message}</p>
      </div>

      {/* Bio */}
      <div>
        <label>Bio</label>
        <textarea {...register("bio")} />
        <p>{errors.bio?.message}</p>
      </div>

      {/* Date of Birth */}
      <div>
        <label>Date of Birth</label>
        <input type="date" {...register("dob")} />
        <p>{errors.dob?.message}</p>
      </div>

      {/* File Upload */}
      <div>
        <label>Upload File</label>
        <input type="file" {...register("file")} />
        <p>{errors.file?.message}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
