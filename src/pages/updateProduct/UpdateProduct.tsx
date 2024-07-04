import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUpdateSingleGadgetMutation } from "../../redux/api/api";

const UpdateProduct = () => {
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [successToast, setsuccessToast] = useState(false);
  const [gadget, setgadget]: any = useState();
  const [updateSingleGadget] = useUpdateSingleGadgetMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsLoad(true);
    fetch(`https://gadgets-server-side.vercel.app/gadgets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setgadget(data);
        setIsLoad(false);
        setValue("product_name", data?.product_name);
        setValue("price", data?.price);
        setValue("brand", data?.brand);
        setValue("category", data?.category);
        setValue("model_number", data?.model_number);
        setValue("operating_system", data?.operating_system);
        setValue("quantity", data?.quantity);
        setValue("features1", data?.features[0]);
        setValue("features2", data?.features[1]);
        setValue("features3", data?.features[2]);
        setValue("connectivity1", data?.connectivity[0]);
        setValue("connectivity2", data?.connectivity[1]);
        setValue("power_source1", data?.power_source[0]);
        setValue("power_source2", data?.power_source[1]);
      })
      .catch(() => setIsLoad(false));
  }, [setgadget]);
  // console.log("first gadget", gadget);
  const [toast, setToast] = useState(false);
  const handleUpdate = async (data: any) => {
    setToast(true);
    // console.log(data);
    const updatedData = {
      product_name: data.product_name,
      product_img: data.product_img,
      price: data.price,
      brand: data.brand,
      category: data.category,
      model_number: data.model_number,
      release_year: data.release_year,
      operating_system: data.operating_system,
      quantity: data.quantity,
      features: [data?.features1, data?.features2, data?.features3],
      connectivity: [data?.connectivity1, data?.connectivity2],
      power_source: [data?.power_source1, data?.power_source2],
    };
    // console.log("insude update handle", updatedData);
    const res = await updateSingleGadget({ updatedData, id });
    if (res) {
      setsuccessToast(true);
      setToast(false);
      setTimeout(() => {
        setsuccessToast(false);
      }, 1000);
    }
  };
  return (
    <div className="my-20 flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <h1 className="text-center text-4xl font-bold">Update </h1>

        {successToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Product updated successfully.</span>
            </div>
          </div>
        )}

        {isLoad && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>Loading...</span>
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
        <form className="mt-6 px-8" onSubmit={handleSubmit(handleUpdate)}>
          <p className="">Product name: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("product_name")}
            defaultValue={gadget?.product_name}
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
            {...register("price")}
            defaultValue={gadget?.price}
            type="text"
          />
          {errors.price && (
            <p className="text-red-600">{errors.price?.message as string}</p>
          )}
          <br />
          <p className="mt-8">Product Image: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("product_img")}
            defaultValue={gadget?.product_img}
            type="text"
          />
          {errors.product_img && (
            <p className="text-red-600">
              {errors.product_img?.message as string}
            </p>
          )}
          <br />

          <p className="mt-8">Product Brand: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("brand")}
            defaultValue={gadget?.brand}
            type="text"
          />
          {errors.brand && (
            <p className="text-red-600">{errors.brand?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Category: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("category")}
            defaultValue={gadget?.category}
            type="text"
          />
          {errors.category && (
            <p className="text-red-600">{errors.category?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Model number: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("model_number")}
            defaultValue={gadget?.model_number}
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
            {...register("operating_system")}
            defaultValue={gadget?.operating_system}
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
            {...register("release_year")}
            type="text"
            defaultValue={gadget?.release_year}
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
            {...register("quantity")}
            defaultValue={gadget?.quantity}
            type="text"
          />
          {errors.quantity && (
            <p className="text-red-600">{errors.quantity?.message as string}</p>
          )}
          <br />

          <p className="mt-8">Product Features: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("features1")}
            defaultValue={gadget?.features[0]}
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
            {...register("features2")}
            defaultValue={gadget?.features[1]}
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
            {...register("features3")}
            defaultValue={gadget?.features[2]}
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
            {...register("connectivity1")}
            defaultValue={gadget?.connectivity[0]}
            type="text"
          />
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("connectivity2")}
            defaultValue={gadget?.connectivity[1]}
            type="text"
          />
          <br />
          <p className="mt-8">Product Power source: </p>
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("power_source1")}
            defaultValue={gadget?.power_source[0]}
            type="text"
          />
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-2"
            {...register("power_source2")}
            defaultValue={gadget?.power_source[1]}
            type="text"
          />
          <br />

          <input
            className="btn w-full max-w-xs mt-6 mb-5"
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
export default UpdateProduct;
