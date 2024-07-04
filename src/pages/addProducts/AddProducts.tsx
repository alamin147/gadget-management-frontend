import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateGadgetsMutation } from "../../redux/api/api";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const AddProducts = () => {
  const [successToast, setsuccessToast] = useState(false);
  const [createGadgets] = useCreateGadgetsMutation();

  const token = useAppSelector(useCurrentToken);
  let decodedUser: any;
  if (token) {
    decodedUser = verifyToken(token);
    // console.log("decodedToken",decodedUser)
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [toast, setToast] = useState(false);
  const handleCreate = async (data: any) => {
    setToast(true);
    // console.log(data);
    const createdData = {
      product_name: data.product_name,
      product_img: data.product_img,
      price: parseFloat(data.price),
      brand: data.brand,
      category: data.category,
      release_year: data.release_year,
      model_number: data.model_number,
      operating_system: data.operating_system,
      quantity: parseInt(data.quantity),
      features: [data?.features1, data?.features2, data?.features3],
      connectivity: [data?.connectivity1, data?.connectivity2],
      power_source: [data?.power_source1, data?.power_source2],
      createdBy: decodedUser?.username
    };
    // console.log("inside handle", createdData);
    const res = await createGadgets(createdData);
    if (res) {
      setsuccessToast(true);
      setToast(false);
      reset();
      setTimeout(() => {
        setsuccessToast(false);
      }, 1000);
    }
  };
  return (
    <div className="my-20 flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <h1 className="text-center text-4xl font-bold">Create Product</h1>

        {successToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Product Created successfully.</span>
            </div>
          </div>
        )}

        {toast && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Loading...</span>
            </div>
          </div>
        )}
        <form className="mt-6 px-8" onSubmit={handleSubmit(handleCreate)}>
          <p className="">Product name: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("product_name", {
              required: "Product name is required",
            })}
            type="text"
          />
          {errors.product_name && (
            <p className="text-red-600">
              {errors.product_name?.message as string}
            </p>
          )}
          <br />
          <p className="mt-8">Product Price: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("price", { required: "Product Price is required" })}
            type="text"
          />
          {errors.price && (
            <p className="text-red-600">{errors.price?.message as string}</p>
          )}
          <br />
          <p className="mt-8">Product Image: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("product_img", { required: "Product image is required" })}
            type="text"
          />
          {errors.product_img && (
            <p className="text-red-600">{errors.product_img?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Brand: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("brand", { required: "Product Band is required" })}
            type="text"
          />
          {errors.brand && (
            <p className="text-red-600">{errors.brand?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Category: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("category", {
              required: "Product category is required",
            })}
            type="text"
          />
          {errors.category && (
            <p className="text-red-600">{errors.category?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Model number: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("model_number", {
              required: "Product model number is required",
            })}
            type="text"
          />
          {errors.model_number && (
            <p className="text-red-600">
              {errors.model_number?.message as string}
            </p>
          )}
          <br />

          <p className="mt-8">Product Operating system: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("operating_system", {
              required: "Product operating system is required",
            })}
            type="text"
          />
          {errors.operating_system && (
            <p className="text-red-600">
              {errors.operating_system?.message as string}
            </p>
          )}
          <br />
          <p className="mt-8">Product Release year: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("release_year", {
              required: "Product release year is required",
            })}
            type="text"
          />
          {errors.release_year && (
            <p className="text-red-600">
              {errors.release_year?.message as string}
            </p>
          )}
          <br />

          <p className="mt-8">Product Quantity: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("quantity", {
              required: "Product quantity is required",
            })}
            type="text"
          />
          {errors.quantity && (
            <p className="text-red-600">{errors.quantity?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Features: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("features1", {
              required: "Product features is required",
            })}
            type="text"
          />
          {errors.features1 && (
            <p className="text-red-600">
              {errors.features1?.message as string}
            </p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("features2", {
              required: "Product features is required",
            })}
            type="text"
          />
          {errors.features2 && (
            <p className="text-red-600">
              {errors.features2?.message as string}
            </p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("features3", {
              required: "Product features is required",
            })}
            type="text"
          />
          {errors.features3 && (
            <p className="text-red-600">
              {errors.features3?.message as string}
            </p>
          )}
          <br />

          <p className="mt-8">Product Connectivity: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("connectivity1", {
              required: "Product connectivity is required",
            })}
            type="text"
          />
          {errors.connectivity1 && (
            <p className="text-red-600">
              {errors.connectivity1?.message as string}
            </p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("connectivity2", {
              required: "Product connectivity is required",
            })}
            type="text"
          />
          {errors.connectivity2 && (
            <p className="text-red-600">
              {errors.connectivity2?.message as string}
            </p>
          )}
          <br />
          <p className="mt-8">Product Power source: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("power_source1", {
              required: "Product power source is required",
            })}
            type="text"
          />
          {errors.power_source1 && (
            <p className="text-red-600">
              {errors.power_source1?.message as string}
            </p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("power_source2", {
              required: "Product power source is required",
            })}
            type="text"
          />
          {errors.power_source2 && (
            <p className="text-red-600">
              {errors.power_source2?.message as string}
            </p>
          )}
          <br />

          <input
            className="btn w-full max-w-xs mt-6 mb-5"
            value="Create"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
export default AddProducts;
